import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "./CartContext";
import Nav from "./Nav";
import Items from "./Items";
import Footer from "./Footer";

const Description = () => {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1); // Added quantity state

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
      addToCart(product._id, quantity); // Pass quantity when adding to cart
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex flex-col mt-11 px-11">
        <div className="flex gap-7">
          <div className="w-1/2">
            {mainImage && (
              <img
                src={mainImage}
                alt={product.title}
                className="w-[450px] h-[500px] rounded-md mb-4"
              />
            )}
            <div className="flex gap-3 flex-wrap">
              {product.images &&
                product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-28 h-28 border-2 cursor-pointer ${
                      mainImage === img ? "border-blue-500" : "border-orange-500"
                    }`}
                    onClick={() => handleThumbnailClick(img)}
                  />
                ))}
            </div>
          </div>
          <div className="w-1/2 flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-2xl font-semibold mb-2">NPR {product.price}</p>
            <p className="text-gray-600 mb-4">
              Available Quantity: {product.availableQuantity} 
            </p>
            <div className="flex items-center mb-4">
              <span className="text-pink-500 text-lg">★★★★★</span>
              <span className="ml-2 text-gray-600">
                {product.reviews} Reviews
              </span>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Quantity</label>
              <input
                type="number"
                value={quantity}
                min="1"
                max={product.availableQuantity} // Limit max quantity to available stock
                onChange={(e) => setQuantity(Math.min(e.target.value, product.availableQuantity))}
                className="w-16 p-2 border border-gray-300 rounded"
              />
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
            <span className="text-4xl font-bold">5.0</span>
            <span className="ml-2 text-pink-500 text-2xl">★★★★★</span>
            <span className="ml-2 text-gray-600">
              Based on {product.reviews} reviews
            </span>
          </div>
          <div className="mt-4">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center mb-1">
                <span className="w-10 text-gray-600">{star} star</span>
                <div className="w-48 h-3 bg-gray-300 rounded-md overflow-hidden mx-2">
                  <div
                    className="h-full bg-pink-500"
                    style={{ width: star === 5 ? "100%" : "0%" }}
                  ></div>
                </div>
                <span className="text-gray-600">
                  ({star === 5 ? product.reviews : 0})
                </span>
              </div>
            ))}
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
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="john.smith@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Rating</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="text-pink-500 text-xl"
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium">Title of Review</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Give your review a title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    How was your overall experience?
                  </label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="4"
                    placeholder="Write your review..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Do you recommend this product?
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input type="radio" name="recommend" className="mr-1" />{" "}
                      Yes
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="recommend" className="mr-1" />{" "}
                      No
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Submit Review
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <div className="font-bold text-2xl text-center mt-8">Trending Now</div>
      <div className="flex gap-16 justify-center items-center mt-10">
        <Items />
        <Items />
        <Items />
        <Items />
      </div>
      <Footer />
    </div>
  );
};

export default Description;
