
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/data/products';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { addToCart } = useCart();

  return (
    <div 
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:shadow-md",
        featured && "md:col-span-2"
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 flex space-x-1">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full opacity-70 hover:opacity-100"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to Wishlist</span>
          </Button>
        </div>
      </div>
      
      <div className="flex flex-grow flex-col space-y-2 p-4">
        <h3 className="font-medium text-sm sm:text-base line-clamp-1">
          <Link to={`/product/${product.id}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>
        
        <div className="flex items-center text-sm">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3.5 w-3.5",
                  i < Math.floor(product.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                )}
              />
            ))}
          </div>
          <span className="ml-1 text-gray-500">
            ({product.reviews.length})
          </span>
        </div>
        
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-semibold">{formatCurrency(product.price)}</span>
          <Button
            size="sm"
            variant="outline"
            className="h-8 rounded-full bg-white hover:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            <span className="sr-only md:not-sr-only md:inline-block">Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
