import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '@/data/products';
import { filterProducts, sortProducts } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import ProductSort from '@/components/ProductSort';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface FilterState {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortOrder, setSortOrder] = useState('featured');
  
  // Локальное состояние для фильтров (дублирует URL-параметры)
  const [activeFilters, setActiveFilters] = useState<FilterState>({});
  
  // Get max price for filter slider
  const maxPrice = Math.max(...products.map(p => p.price));
  
  // Extract filters from URL search params
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');
  const minPriceParam = searchParams.get('minPrice');
  const maxPriceParam = searchParams.get('maxPrice');
  const minRatingParam = searchParams.get('minRating');
  
  // Применяем фильтры при изменении URL-параметров или локальных фильтров
  useEffect(() => {
    let filters = {
      category: categoryParam || activeFilters.category || undefined,
      search: searchParam || undefined,
      minPrice: minPriceParam ? parseFloat(minPriceParam) : activeFilters.minPrice,
      maxPrice: maxPriceParam ? parseFloat(maxPriceParam) : activeFilters.maxPrice,
      rating: minRatingParam ? parseInt(minRatingParam) : activeFilters.minRating,
    };
    
    console.log('Применяемые фильтры из URL и локального состояния:', filters);
    
    // Применение фильтров
    let result = filterProducts(products, filters);
    
    // Применение сортировки
    result = sortProducts(result, sortOrder);
    
    console.log('Отфильтровано товаров:', result.length);
    
    setFilteredProducts(result);
  }, [categoryParam, searchParam, minPriceParam, maxPriceParam, minRatingParam, sortOrder, activeFilters]);
  
  const handleFilter = (filters: any) => {
    console.log('Получены фильтры:', filters);
    
    // Сохраняем фильтры в локальном состоянии
    setActiveFilters(filters);
    
    const newParams = new URLSearchParams(searchParams.toString());
    
    // Обновляем или удаляем параметр категории
    if (filters.category) {
      newParams.set('category', filters.category);
    } else {
      newParams.delete('category');
    }
    
    // Обновляем или удаляем параметр минимальной цены
    if (filters.minPrice !== undefined && filters.minPrice > 0) {
      newParams.set('minPrice', filters.minPrice.toString());
    } else {
      newParams.delete('minPrice');
    }
    
    // Обновляем или удаляем параметр максимальной цены
    if (filters.maxPrice !== undefined && filters.maxPrice < maxPrice) {
      newParams.set('maxPrice', filters.maxPrice.toString());
    } else {
      newParams.delete('maxPrice');
    }
    
    // Обновляем или удаляем параметр минимального рейтинга
    if (filters.minRating) {
      newParams.set('minRating', filters.minRating.toString());
    } else {
      newParams.delete('minRating');
    }
    
    // После обновления всех параметров
    console.log('Новые параметры URL:', Object.fromEntries(newParams.entries()));
    
    // Обновляем URL с новыми параметрами фильтрации
    setSearchParams(newParams);
  };
  
  const handleSort = (value: string) => {
    setSortOrder(value);
  };

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-medium mb-2">
              {categoryParam 
                ? `${categoryParam === 'electronics' ? 'Электроника' 
                  : categoryParam === 'furniture' ? 'Мебель' 
                  : categoryParam === 'lighting' ? 'Освещение' 
                  : categoryParam === 'home decor' ? 'Декор для дома'
                  : categoryParam === 'kitchen' ? 'Кухня'
                  : categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)}`
                : 'Все товары'}
            </h1>
            <p className="text-gray-500">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'товар' : filteredProducts.length >= 2 && filteredProducts.length <= 4 ? 'товара' : 'товаров'} доступно
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters sidebar */}
            <div className="w-full md:w-64 flex-shrink-0">
              <ProductFilters onFilter={handleFilter} maxPrice={maxPrice} />
            </div>
            
            {/* Products grid */}
            <div className="flex-grow">
              <div className="mb-6 flex items-center justify-between">
                <ProductSort onSort={handleSort} currentSort={sortOrder} />
              </div>
              
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">Товары не найдены</h3>
                  <p className="text-gray-500">Попробуйте изменить параметры фильтрации или условия поиска.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductsPage;
