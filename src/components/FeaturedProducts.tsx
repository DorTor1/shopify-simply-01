
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

interface FeaturedProductsProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  title,
  products,
  viewAllLink = '/products',
}) => {
  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-medium tracking-tight">{title}</h2>
          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="flex items-center text-sm font-medium text-black hover:underline"
            >
              Посмотреть все
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              featured={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
