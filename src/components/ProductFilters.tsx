import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FilterIcon, X } from 'lucide-react';
import { getCategories } from '@/data/products';
import { formatCurrency, usdToRub, USD_TO_RUB_RATE } from '@/lib/utils';

interface FilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}

interface ProductFiltersProps {
  onFilter: (filters: FilterOptions) => void;
  maxPrice: number;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ onFilter, maxPrice }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  // Максимальная цена в рублях для слайдера
  const maxPriceRub = usdToRub(maxPrice);

  // Инициализируем оба состояния одновременно
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [priceRangeRub, setPriceRangeRub] = useState<[number, number]>([0, maxPriceRub]);
  const [selectedRating, setSelectedRating] = useState<number | undefined>(undefined);

  const categories = getCategories();

  // Синхронизируем диапазоны при изменении maxPrice
  useEffect(() => {
    setPriceRange([0, maxPrice]);
    setPriceRangeRub([0, usdToRub(maxPrice)]);
  }, [maxPrice]);

  const handleApplyFilters = () => {
    console.log('Применение фильтров:');
    console.log('Категория:', selectedCategory);
    console.log('Диапазон цен (USD):', priceRange);
    console.log('Диапазон цен (RUB):', priceRangeRub);
    console.log('Минимальный рейтинг:', selectedRating);
    
    onFilter({
      category: selectedCategory,
      minPrice: priceRange[0], // Используем значение уже сохраненное в долларах
      maxPrice: priceRange[1], // Используем значение уже сохраненное в долларах
      minRating: selectedRating,
    });
    
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory(undefined);
    setPriceRangeRub([0, maxPriceRub]);
    setPriceRange([0, maxPrice]);
    setSelectedRating(undefined);
    
    onFilter({});
    
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className="md:hidden mb-4">
        <Button 
          onClick={toggleFilters}
          variant="outline"
          className="w-full flex items-center justify-center"
        >
          <FilterIcon className="h-4 w-4 mr-2" />
          {isOpen ? "Скрыть фильтры" : "Показать фильтры"}
        </Button>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:block bg-white md:bg-transparent z-30 md:z-auto fixed md:relative inset-0 md:inset-auto p-4 md:p-0 overflow-auto md:overflow-visible`}>
        <div className="md:hidden flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Фильтры</h2>
          <Button variant="ghost" size="icon" onClick={toggleFilters}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Categories */}
          <div>
            <h3 className="font-medium text-sm mb-3">Категории</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategory === category}
                    onCheckedChange={(checked) => {
                      setSelectedCategory(checked ? category : undefined);
                    }}
                  />
                  <Label
                    htmlFor={`category-${category}`}
                    className="ml-2 text-sm font-normal capitalize cursor-pointer"
                  >
                    {category === 'electronics' && 'Электроника'}
                    {category === 'furniture' && 'Мебель'}
                    {category === 'lighting' && 'Освещение'}
                    {category === 'home decor' && 'Декор для дома'}
                    {category === 'kitchen' && 'Кухня'}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-medium text-sm mb-3">Диапазон цен</h3>
            <Slider
              value={priceRangeRub}
              min={0}
              max={maxPriceRub}
              step={50}
              onValueChange={(value) => {
                const rubRange = value as [number, number];
                setPriceRangeRub(rubRange);
                
                const minUsd = Math.floor((rubRange[0] / USD_TO_RUB_RATE) * 100) / 100;
                const maxUsd = Math.ceil((rubRange[1] / USD_TO_RUB_RATE) * 100) / 100;
                
                setPriceRange([minUsd, maxUsd]);
                
                console.log('Текущий диапазон цен (RUB):', rubRange);
                console.log('Пересчитано в USD:', [minUsd, maxUsd]);
              }}
            />
            <div className="flex justify-between mt-2 text-sm">
              <span>{Math.round(priceRangeRub[0])} ₽</span>
              <span>{Math.round(priceRangeRub[1])} ₽</span>
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="font-medium text-sm mb-3">Рейтинг</h3>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={selectedRating === rating}
                    onCheckedChange={(checked) => {
                      setSelectedRating(checked ? rating : undefined);
                    }}
                  />
                  <Label
                    htmlFor={`rating-${rating}`}
                    className="ml-2 text-sm font-normal cursor-pointer"
                  >
                    {rating}+ Звезда
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex space-x-2 pt-2">
            <Button 
              variant="default" 
              className="flex-1"
              onClick={handleApplyFilters}
            >
              Применить фильтры
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleResetFilters}
            >
              Сбросить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
