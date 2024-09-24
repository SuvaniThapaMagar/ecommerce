import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Filter = ({ onFilter }) => {
  const [stockStatus, setStockStatus] = useState("inStock");

  
  const handleStockChange = (event) => {
    const newStockStatus = event.target.value;
    setStockStatus(newStockStatus);
    if (typeof onFilter === 'function') {
      onFilter({ stockStatus: newStockStatus });
    } else {
      console.error('onFilter is not a function');
    }
  };

  return (
    <div className="p-4 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Filter Products</h2>

      {/* Category Filter */}
      <div className="flex flex-col gap-5 mb-4">
        <NavLink
          to="/products/category/fashion"
          className={({ isActive }) =>
            `block p-2 rounded ${
              isActive
                ? "bg-indigo-500 text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`
          }
        >
          Fashion
        </NavLink>
        <NavLink
          to="/products/category/accessories"
          className={({ isActive }) =>
            `block p-2 rounded ${
              isActive
                ? "bg-indigo-500 text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`
          }
        >
          Accessories
        </NavLink>
        <NavLink
          to="/products/category/decor"
          className={({ isActive }) =>
            `block p-2 rounded ${
              isActive
                ? "bg-indigo-500 text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`
          }
        >
          Decor
        </NavLink>
        <NavLink
          to="/products/category/gift"
          className={({ isActive }) =>
            `block p-2 rounded ${
              isActive
                ? "bg-indigo-500 text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`
          }
        >
          Gifts
        </NavLink>
      </div>

     
      
      
    </div>
  );
};

export default Filter;