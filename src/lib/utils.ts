import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Курс конвертации USD в RUB
export const USD_TO_RUB_RATE = 90;

// Конвертация из долларов в рубли
export function usdToRub(usdAmount: number): number {
  return usdAmount * USD_TO_RUB_RATE;
}

// Конвертация из рублей в доллары
export function rubToUsd(rubAmount: number): number {
  return rubAmount / USD_TO_RUB_RATE;
}

// Format price to currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0
  }).format(usdToRub(amount));
}

// Generate a random ID (used for cart items, orders, etc.)
export function generateId(): number {
  return Math.floor(Math.random() * 1000000);
}

// Format date
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('ru-Ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Show success toast
export function showSuccess(message: string) {
  toast.success(message);
}

// Show error toast
export function showError(message: string) {
  toast.error(message);
}

// Show info toast
export function showInfo(message: string) {
  toast.info(message);
}

// Filter products based on multiple criteria
export function filterProducts(
  products: any[],
  { category, minPrice, maxPrice, rating, search }: { 
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    search?: string;
  }
) {
  console.log('Фильтрация товаров с параметрами:', { category, minPrice, maxPrice, rating, search });
  
  return products.filter(product => {
    // Filter by category
    if (category && product.category !== category) return false;
    
    // Filter by price range with epsilon to handle floating point errors
    if (minPrice !== undefined) {
      const minPriceValue = Math.floor(minPrice * 100) / 100; // Округляем до 2 знаков после запятой
      if (product.price < minPriceValue) return false;
    }
    
    if (maxPrice !== undefined) {
      const maxPriceValue = Math.ceil(maxPrice * 100) / 100; // Округляем до 2 знаков после запятой
      if (product.price > maxPriceValue) return false;
    }
    
    // Filter by minimum rating
    if (rating !== undefined && product.rating < rating) return false;
    
    // Filter by search term
    if (search && !product.name.toLowerCase().includes(search.toLowerCase()) && 
        !product.description.toLowerCase().includes(search.toLowerCase())) return false;
    
    return true;
  });
}

// Sort products
export function sortProducts(products: any[], sortBy: string) {
  const productsCopy = [...products];
  
  switch (sortBy) {
    case 'price-asc':
      return productsCopy.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return productsCopy.sort((a, b) => b.price - a.price);
    case 'name-asc':
      return productsCopy.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return productsCopy.sort((a, b) => b.name.localeCompare(a.name));
    case 'rating-desc':
      return productsCopy.sort((a, b) => b.rating - a.rating);
    default:
      return productsCopy;
  }
}

// Get recommended products based on a product
export function getRecommendedProducts(products: any[], currentProduct: any, limit = 4) {
  // First try to get products from the same category
  const sameCategory = products
    .filter(p => p.id !== currentProduct.id && p.category === currentProduct.category)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
  
  // If we don't have enough, add some top-rated products from other categories
  if (sameCategory.length < limit) {
    const otherCategories = products
      .filter(p => p.id !== currentProduct.id && p.category !== currentProduct.category)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit - sameCategory.length);
    
    return [...sameCategory, ...otherCategories];
  }
  
  return sameCategory;
}
