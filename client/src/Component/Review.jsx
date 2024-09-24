import React, { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import Nav from "./Nav"
import Footer from "./Footer"
const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/reviews`);
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data.reviews);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const emptyStars = totalStars - fullStars;

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={`full-${index}`} style={{ color: "#ffc107" }} />
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={`empty-${index}`} style={{ color: "#ffc107" }} />
        ))}
      </>
    );
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Nav/>
    
    <div className="review-page">
      <h1 className="text-2xl font-bold mb-4">All Product Reviews</h1>
      {reviews.length === 0 ? (
        <p>No reviews available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-start mb-2">
                {review.productId &&
                  review.productId.images &&
                  review.productId.images.length > 0 && (
                    <img
                      src={review.productId.images[0]}
                      alt={review.productId.title || "Product Image"}
                      className="w-20 h-20 object-cover rounded-md mr-4"
                    />
                  )}

                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      {renderStars(review.star)}
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                  <h3 className="font-semibold mt-1">
                    {review.productId
                      ? review.productId.title
                      : "Untitled Product"}
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 mb-2">
                {review.comment || "No comment provided"}
              </p>
              <div className="mt-2">
                <span className="font-semibold">
                  {review.postedby
                    ? `${review.postedby.firstname || ""} ${
                        review.postedby.lastname || ""
                      }`
                    : "Unknown User"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    <Footer/>
    </div>
  );
};

export default ReviewPage;
