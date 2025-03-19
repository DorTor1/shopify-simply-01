
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format price to currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
}

// Generate a random ID (used for cart items, orders, etc.)
export function generateId(): number {
  return Math.floor(Math.random() * 1000000);
}

// Format date
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
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
  return products.filter(product => {
    // Filter by category
    if (category && product.category !== category) return false;
    
    // Filter by price range
    if (minPrice !== undefined && product.price < minPrice) return false;
    if (maxPrice !== undefined && product.price > maxPrice) return false;
    
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
