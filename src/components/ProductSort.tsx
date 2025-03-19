
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProductSortProps {
  onSort: (value: string) => void;
  currentSort: string;
}

const ProductSort: React.FC<ProductSortProps> = ({ onSort, currentSort }) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">Сортировать по:</span>
      <Select defaultValue={currentSort} onValueChange={onSort}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Порядок сортировки" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="featured">Рекомендуемые</SelectItem>
          <SelectItem value="price-asc">Цена: от низкой к высокой</SelectItem>
          <SelectItem value="price-desc">Цена: от высокой к низкой</SelectItem>
          <SelectItem value="rating-desc">Самый высокий рейтинг</SelectItem>
          <SelectItem value="name-asc">Название: от А до Я</SelectItem>
          <SelectItem value="name-desc">Название: от Я до А</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProductSort;
