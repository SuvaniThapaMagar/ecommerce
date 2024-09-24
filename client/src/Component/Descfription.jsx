import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "./CartContext";
import Nav from "./Nav";
import Footer from "./Footer";

const Description = () => {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/product/${id}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setMainImage(data.images[0]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product._id, quantity, mainImage);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const incrementQuantity = () => {
    if (product && quantity < product.quantity) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (rating < 1 || rating > 5 || !comment.trim()) {
      alert("Please provide a valid rating and comment.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          star: rating,
          productId: id,
          comment,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to submit review: ${errorMessage}`);
      }

      const data = await response.json();
      console.log("Response data:", data);

      setShowForm(false);
      setRating(0);
      setComment("");

      const updatedProductResponse = await fetch(
        `http://localhost:4000/api/product/${id}`
      );
      if (updatedProductResponse.ok) {
        const updatedProduct = await updatedProductResponse.json();
        setProduct(updatedProduct);
      } else {
        console.error("Failed to refetch product data");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(error.message);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <Nav />
      <div className="flex flex-col mt-11 px-4 sm:px-11">
        <div className="flex flex-col lg:flex-row gap-7">
          {/* Left side with images */}
          <div className="w-full lg:w-1/2">
            {mainImage && (
              <img
                src={mainImage}
                alt={product.title}
                className="w-full lg:w-[450px] h-auto lg:h-[500px] rounded-md mb-4"
              />
            )}
            <div className="flex gap-3 flex-wrap">
              {product.images &&
                product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-24 h-24 sm:w-28 sm:h-28 border-2 cursor-pointer ${
                      mainImage === img
                        ? "border-blue-500"
                        : "border-orange-500"
                    }`}
                    onClick={() => handleThumbnailClick(img)}
                  />
                ))}
            </div>
          </div>
          {/* Right side with product details */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-xl sm:text-2xl font-semibold mb-2">$ {product.price}</p>
            <p className="text-gray-600 mb-4">
              Available Quantity: {product.quantity}
            </p>
            <div className="mb-4 flex items-center">
              <label className="block text-sm font-medium mr-2">
                Quantity:
              </label>
              <button
                onClick={decrementQuantity}
                className="px-2 py-1 border rounded"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                readOnly
                className="w-12 p-2 border border-gray-300 rounded text-center mx-2"
              />
              <button
                onClick={incrementQuantity}
                className="px-2 py-1 border rounded"
              >
                +
              </button>
            </div>
            <button
              className="w-full p-3 mb-4 text-white bg-black"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>
            <button className="w-full p-3 text-white bg-blue-600 rounded-md">
              Buy with Shop Pay
            </button>
            <p className="mt-4 text-center text-gray-600 underline cursor-pointer">
              MORE PAYMENT OPTIONS
            </p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Reviews</h2>
          <div className="flex items-center mt-4">
            <span className="text-4xl font-bold">
              {product.totalrating.toFixed(1)}
            </span>
            <span className="ml-2 text-pink-500 text-2xl">
              {"★".repeat(Math.round(product.totalrating))}
              {"☆".repeat(5 - Math.round(product.totalrating))}
            </span>
            <span className="ml-2 text-gray-600">
              Based on {product.ratings.length} reviews
            </span>
          </div>
          <button
            onClick={toggleForm}
            className="w-full p-3 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
          >
            Write a Review
          </button>
          {showForm && (
            <div className="bg-gray-100 p-4 mt-4 rounded-md">
              <h2 className="text-lg font-semibold mb-2">Write a Review</h2>
              <form onSubmit={handleReviewSubmit}>
                <div className="mb-4">
                  <label className="block mb-2">Rating:</label>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <label key={star} className="inline-flex items-center">
                      <input
                        type="radio"
                        value={star}
                        checked={rating === star}
                        onChange={() => setRating(star)}
                        className="mr-1"
                      />
                      {star} ★
                    </label>
                  ))}
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Comment:</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="4"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full p-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
                >
                  Submit Review
                </button>
              </form>
            </div>
          )}

          {/* Display existing reviews */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
            {product.ratings.map((review, index) => (
              <div key={index} className="border-b pb-4 mb-4">
                <div className="flex items-center mb-2">
                  <span className="text-pink-500 text-xl">
                    {"★".repeat(review.star)}
                    {"☆".repeat(5 - review.star)}
                  </span>
                  <span className="ml-2 text-gray-600">
                    by{" "}
                    {review.postedby && review.postedby.firstname
                      ? `${review.postedby.firstname} ${review.postedby.lastname}`
                      : "Anonymous"}
                  </span>
                </div>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Description;