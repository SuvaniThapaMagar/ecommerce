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

      {/* Stock Status Filter */}
      <div className="mb-4">
        <span className="block text-sm font-medium text-gray-700">
          Stock Status
        </span>
        <div className="flex items-center mt-2">
          <input
            type="radio"
            id="inStock"
            name="stockStatus"
            value="inStock"
            checked={stockStatus === "inStock"}
            onChange={handleStockChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor="inStock"
            className="ml-2 text-sm font-medium text-gray-700"
          >
            In Stock
          </label>
        </div>
        <div className="flex items-center mt-2">
          <input
            type="radio"
            id="outOfStock"
            name="stockStatus"
            value="outOfStock"
            checked={stockStatus === "outOfStock"}
            onChange={handleStockChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor="outOfStock"
            className="ml-2 text-sm font-medium text-gray-700"
          >
            Out of Stock
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filter;