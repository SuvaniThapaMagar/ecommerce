import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { BiCartAdd } from "react-icons/bi"; // For "Buy" button

const Bag = () => {
  const [cloth, setCloth] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      console.log("Fetched data:", data);
      setCloth(data); // Set cloth as the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const displayedCloth = Array.isArray(cloth) ? cloth.slice(0, 5) : [];

  return (
    <div className="bg-gray-50 p-4">
      <div className="flex flex-row overflow-x-auto gap-4">
        {displayedCloth.map((item, index) => (
          <div
            key={index}
            className="relative bg-white rounded-lg shadow-md overflow-hidden w-64"
          >
            {/* Image with Hover Effect */}
            <div className="relative">
              <img
                className="h-40 w-full object-cover transition-transform transform hover:scale-105"
                src={item.image}
                alt={item.title}
              />
              <div className="absolute top-2 left-2 text-white bg-black/50 rounded-full p-1">
                <FaHeart className="text-white" />
              </div>
            </div>
            {/* Details */}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4">${item.price.toFixed(2)}</p>
              <button className="w-full bg-pink-500 text-white py-2 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors">
                <BiCartAdd className="mr-2" /> Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bag;
