
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FilterIcon, X } from 'lucide-react';
import { getCategories } from '@/data/products';

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
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [selectedRating, setSelectedRating] = useState<number | undefined>(undefined);

  const categories = getCategories();

  const handleApplyFilters = () => {
    onFilter({
      category: selectedCategory,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      minRating: selectedRating,
    });
    
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory(undefined);
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
          {isOpen ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:block bg-white md:bg-transparent z-30 md:z-auto fixed md:relative inset-0 md:inset-auto p-4 md:p-0 overflow-auto md:overflow-visible`}>
        <div className="md:hidden flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Filters</h2>
          <Button variant="ghost" size="icon" onClick={toggleFilters}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Categories */}
          <div>
            <h3 className="font-medium text-sm mb-3">Categories</h3>
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
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-medium text-sm mb-3">Price Range</h3>
            <Slider
              value={priceRange}
              min={0}
              max={maxPrice}
              step={10}
              onValueChange={(value) => setPriceRange(value as [number, number])}
            />
            <div className="flex justify-between mt-2 text-sm">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="font-medium text-sm mb-3">Rating</h3>
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
                    {rating}+ Stars
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
              Apply Filters
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleResetFilters}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
