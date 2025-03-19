
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, ArrowLeft } from 'lucide-react';
import { products, Product, Review } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { formatCurrency, getRecommendedProducts } from '@/lib/utils';
import ProductReviews from '@/components/ProductReviews';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  // Find product by ID
  const product = products.find(p => p.id === Number(id));
  
  if (!product) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-12">
              <h1 className="text-2xl font-medium mb-4">Product Not Found</h1>
              <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
              <Button asChild>
                <Link to="/products">Back to Products</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  // Get recommended products
  const recommendedProducts = getRecommendedProducts(products, product);
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      id: product.reviews.length + 1,
      ...reviewData,
      date: new Date().toISOString().split('T')[0],
    };
    
    product.reviews.unshift(newReview);
    
    // Recalculate product rating
    const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    product.rating = totalRating / product.reviews.length;
  };

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link to="/" className="text-gray-500 hover:text-gray-700">
                  Home
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li>
                <Link to="/products" className="text-gray-500 hover:text-gray-700">
                  Products
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li className="text-gray-900 font-medium truncate">{product.name}</li>
            </ol>
          </nav>
          
          {/* Back button (mobile) */}
          <div className="md:hidden mb-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/products" className="inline-flex items-center">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Products
              </Link>
            </Button>
          </div>
          
          {/* Product details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Product image */}
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            {/* Product info */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-medium mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(product.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating.toFixed(1)} ({product.reviews.length} reviews)
                </span>
              </div>
              
              <p className="text-2xl font-semibold mb-6">{formatCurrency(product.price)}</p>
              
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Category: <span className="capitalize">{product.category}</span></p>
                <p className="text-sm text-gray-500">
                  Availability: 
                  <span className={product.stock > 0 ? "text-green-600 ml-1" : "text-red-600 ml-1"}>
                    {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                  </span>
                </p>
              </div>
              
              {/* Quantity selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="h-10 w-10"
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="h-10 w-10"
                  >
                    +
                  </Button>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Button 
                  onClick={handleAddToCart} 
                  className="flex-1"
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" className="flex-1">
                  <Heart className="h-5 w-5 mr-2" />
                  Add to Wishlist
                </Button>
              </div>
            </div>
          </div>
          
          {/* Product reviews */}
          <ProductReviews 
            reviews={product.reviews} 
            productId={product.id} 
            onAddReview={handleAddReview} 
          />
          
          {/* Recommended products */}
          {recommendedProducts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-medium mb-6">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recommendedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;
