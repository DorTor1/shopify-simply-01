
import React, { useState } from 'react';
import { Star, StarIcon } from 'lucide-react';
import { Review } from '@/data/products';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

interface ProductReviewsProps {
  reviews: Review[];
  productId: number;
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews, productId, onAddReview }) => {
  const { isAuthenticated, currentUser } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated || !currentUser) return;
    
    onAddReview({
      userId: currentUser.id,
      username: currentUser.name,
      rating,
      comment,
    });
    
    // Reset form
    setRating(5);
    setComment('');
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-medium mb-6">Customer Reviews</h2>
      
      {/* Review summary */}
      {reviews.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <div className="flex mr-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-5 w-5",
                    i < Math.round(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-lg font-medium">
              {(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)}
            </span>
            <span className="text-gray-500 ml-2">({reviews.length} reviews)</span>
          </div>
        </div>
      )}
      
      {/* Add review */}
      {isAuthenticated ? (
        <div className="border rounded-lg p-4 mb-8">
          <h3 className="text-lg font-medium mb-3">Write a Review</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="p-1"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      className={cn(
                        "h-6 w-6",
                        (hoveredRating ? star <= hoveredRating : star <= rating)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="comment" className="block text-sm font-medium mb-2">
                Comment
              </label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this product..."
                rows={4}
                required
              />
            </div>
            <Button type="submit" className="w-full sm:w-auto">
              Submit Review
            </Button>
          </form>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4 mb-8 text-center">
          <p className="mb-2">Please sign in to write a review</p>
          <Button variant="outline" asChild>
            <a href="/login">Sign In</a>
          </Button>
        </div>
      )}
      
      {/* Review list */}
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-6">
              <div className="flex justify-between mb-2">
                <div>
                  <p className="font-medium">{review.username}</p>
                  <div className="flex items-center mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
              </div>
              <p className="mt-2 text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
      )}
    </div>
  );
};

export default ProductReviews;
