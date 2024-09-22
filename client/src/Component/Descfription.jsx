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
  const [quantity, setQuantity] = useState(1);

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

  // Increment and Decrement functions without dependency on product availability
  const incrementQuantity = () => {
    if (product && quantity < product.quantity) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <Nav />
      <div className="flex flex-col mt-11 px-11">
        <div className="flex gap-7">
          {/* Left side with images */}
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
          <div className="w-1/2 flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-2xl font-semibold mb-2">NPR {product.price}</p>
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
                className="w-16 p-2 border border-gray-300 rounded text-center mx-2"
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
            <span className="text-4xl font-bold">5.0</span>
            <span className="ml-2 text-pink-500 text-2xl">★★★★★</span>
            <span className="ml-2 text-gray-600">
              Based on {product.reviews} reviews
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
              {/* Form content here */}
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
