
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { StarRating } from '../components/StarRating';
import { ReviewCard } from '../components/ReviewCard';
import { useBooks } from '../context/BookContext';
import { 
  Calendar, 
  Tag, 
  ArrowLeft,
  ThumbsUp,
  AlertCircle,
  MessageSquare 
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBook, addReview } = useBooks();
  const { toast } = useToast();
  const [book, setBook] = useState(getBook(id!));
  const [userReview, setUserReview] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Update book when it changes in context
    setBook(getBook(id!));
    // Scroll to top when navigating to a new book
    window.scrollTo(0, 0);
  }, [id, getBook]);

  // If book not found, navigate back
  useEffect(() => {
    if (!book) {
      toast({
        title: "Book not found",
        description: "The book you're looking for doesn't exist.",
        variant: "destructive",
      });
      navigate('/books');
    }
  }, [book, navigate, toast]);

  if (!book) return null;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate network request
    setTimeout(() => {
      addReview(book.id, {
        userId: 'guest-user',
        userName: 'Guest Reader',
        rating: userRating,
        text: userReview
      });

      toast({
        title: "Review submitted",
        description: "Your review has been added successfully.",
      });

      setUserReview('');
      setUserRating(5);
      setIsSubmitting(false);
    }, 800);
  };

  // Group reviews by recent and older
  const recentReviews = book.reviews.slice(0, 3);
  const olderReviews = book.reviews.slice(3);

  return (
    <Layout>
      <button 
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="sticky top-24">
            <div 
              className={`aspect-[2/3] overflow-hidden rounded-lg shadow-md ${imageLoaded ? '' : 'animate-pulse bg-muted'}`}
            >
              <div
                className={`blur-load h-full w-full ${imageLoaded ? 'loaded' : ''}`}
                style={{ backgroundImage: book.blurImage ? `url(${book.blurImage})` : undefined }}
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="h-full w-full object-cover"
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm text-muted-foreground">
                    {new Date(book.publicationDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {book.genres.map(genre => (
                    <div
                      key={genre}
                      className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium"
                    >
                      <Tag className="mr-1 h-3 w-3" />
                      {genre}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl animate-fade-in">
            {book.title}
          </h1>
          <p className="mt-2 text-xl font-medium animate-fade-in" style={{ animationDelay: '100ms' }}>
            by {book.author}
          </p>
          
          <div className="mt-3 flex items-center animate-fade-in" style={{ animationDelay: '200ms' }}>
            <StarRating rating={book.rating} size="lg" />
            <span className="ml-2 text-muted-foreground">
              {book.rating.toFixed(1)} ({book.reviews.length} reviews)
            </span>
          </div>

          <div className="mt-6 prose prose-lg max-w-none animate-fade-in" style={{ animationDelay: '300ms' }}>
            <p className="text-muted-foreground">{book.description}</p>
          </div>

          <div className="mt-10 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Reviews
            </h2>

            <form onSubmit={handleReviewSubmit} className="mb-10 bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Write a Review</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex gap-4 items-center">
                  <StarRating rating={userRating} />
                  <select
                    value={userRating}
                    onChange={(e) => setUserRating(Number(e.target.value))}
                    className="rounded-md border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="review" className="block text-sm font-medium mb-2">
                  Your Review
                </label>
                <textarea
                  id="review"
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                  rows={4}
                  placeholder="Share your thoughts about this book..."
                  className="w-full rounded-md border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting || !userReview.trim()}
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
                <ThumbsUp className="ml-2 h-4 w-4" />
              </button>
            </form>

            {recentReviews.length > 0 ? (
              <div className="space-y-2">
                {recentReviews.map((review, index) => (
                  <ReviewCard key={review.id} review={review} index={index} />
                ))}
                
                {olderReviews.length > 0 && (
                  <>
                    <h3 className="text-lg font-medium mt-8 mb-4">Older Reviews</h3>
                    {olderReviews.map((review, index) => (
                      <ReviewCard 
                        key={review.id} 
                        review={review} 
                        index={index + recentReviews.length} 
                      />
                    ))}
                  </>
                )}
              </div>
            ) : (
              <div className="text-center p-8 bg-muted/50 rounded-lg border border-border">
                <AlertCircle className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-1">No reviews yet</h3>
                <p className="text-muted-foreground mb-4">Be the first to review this book</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookDetail;
