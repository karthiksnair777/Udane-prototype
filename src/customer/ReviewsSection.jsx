import React, { useState, useEffect } from "react";
import { FaStar, FaRegStar } from 'react-icons/fa';
import SimilarProducts from "./SimilarProducts";

const ReviewsSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: "",
    comment: "",
    name: ""
  });
  const [hoverRating, setHoverRating] = useState(0);

  // Generate a unique storage key based on product ID
  const storageKey = `product_reviews_${productId || 'default'}`;

  // Load reviews from localStorage on component mount
  useEffect(() => {
    const savedReviews = localStorage.getItem(storageKey);
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews));
      } catch (error) {
        console.error('Error loading reviews from localStorage:', error);
        setReviews([]);
      }
    }
  }, [storageKey]);

  // Save reviews to localStorage whenever reviews change
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(reviews));
  }, [reviews, storageKey]);

  // Star rating component
  const StarRating = ({ rating, onRatingChange, interactive = false }) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={interactive ? "star-btn" : ""}
            onClick={() => interactive && onRatingChange(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            disabled={!interactive}
          >
            {star <= (hoverRating || rating) ? (
              <FaStar className="star filled" />
            ) : (
              <FaRegStar className="star" />
            )}
          </button>
        ))}
      </div>
    );
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReview.rating === 0) {
      alert("Please select a rating");
      return;
    }
    
    const review = {
      id: Date.now(), // Use timestamp for unique ID
      ...newReview,
      date: new Date().toISOString().split('T')[0],
      productId: productId || 'default'
    };
    
    // Update reviews state (this will trigger the useEffect to save to localStorage)
    setReviews(prevReviews => [review, ...prevReviews]);
    
    // Reset form
    setNewReview({
      rating: 0,
      title: "",
      comment: "",
      name: ""
    });
    setShowReviewForm(false);
    setHoverRating(0);
    
    // Show success message
    alert('Thank you for your review!');
  };

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  // Calculate rating distribution
  const ratingDistribution = [0, 0, 0, 0, 0];
  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingDistribution[5 - review.rating]++;
    }
  });

  // Function to clear all reviews (optional - for testing)
  const clearAllReviews = () => {
    if (window.confirm('Are you sure you want to clear all reviews?')) {
      setReviews([]);
      localStorage.removeItem(storageKey);
    }
  };

  return (
    <div className="reviews-section">
      <div className="reviews-header">
        <h2>Rating & Reviews</h2>
        
        {/* Optional: Clear reviews button (remove in production) */}
        {reviews.length > 0 && (
          <button 
            className="clear-reviews-btn"
            onClick={clearAllReviews}
            style={{
              background: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              cursor: 'pointer',
              marginBottom: '10px'
            }}
          >
            Clear All Reviews
          </button>
        )}
        
        <div className="reviews-summary">
          <div className="average-rating">
            <div className="rating-score">{averageRating}</div>
            <div className="rating-stars">
              <StarRating rating={parseFloat(averageRating)} />
            </div>
            <div className="total-reviews">({reviews.length} Review{reviews.length !== 1 ? 's' : ''})</div>
          </div>
          
          <div className="rating-distribution">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="rating-bar">
                <span className="stars-label">{stars} star{stars !== 1 ? 's' : ''}</span>
                <div className="bar-container">
                  <div 
                    className="bar-fill"
                    style={{ 
                      width: reviews.length > 0 
                        ? `${(ratingDistribution[5 - stars] / reviews.length) * 100}%` 
                        : '0%' 
                    }}
                  ></div>
                </div>
                <span className="bar-count">({ratingDistribution[5 - stars]})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="reviews-actions">
        <button 
          className="review-btn primary"
          onClick={() => setShowReviewForm(true)}
        >
          Write a Review
        </button>
        <button className="review-btn secondary">
          Share Your Thoughts
        </button>
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="review-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Write a Review</h3>
              <button 
                className="close-btn"
                onClick={() => setShowReviewForm(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmitReview}>
              <div className="form-group">
                <label>Your Rating *</label>
                <StarRating 
                  rating={newReview.rating} 
                  onRatingChange={handleRatingChange}
                  interactive={true}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="reviewer-name">Your Name</label>
                <input
                  type="text"
                  id="reviewer-name"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder="Enter your name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="review-title">Review Title</label>
                <input
                  type="text"
                  id="review-title"
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  placeholder="Summarize your experience"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="review-comment">Your Review *</label>
                <textarea
                  id="review-comment"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Share details of your experience with this product"
                  rows="5"
                  required
                />
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowReviewForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="reviews-list">
        {reviews.length === 0 ? (
          <div className="no-reviews">
            <p>No reviews yet. Be the first to review this product!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-name">{review.name || "Anonymous"}</div>
                  <div className="review-date">{review.date}</div>
                </div>
                <div className="review-rating">
                  <StarRating rating={review.rating} />
                </div>
              </div>
              {review.title && (
                <h4 className="review-title">{review.title}</h4>
              )}
              <p className="review-comment">{review.comment}</p>
            </div>
          ))
        )}
      </div>
      <SimilarProducts/>
    </div>
  );
};

export default ReviewsSection;