import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoPersonOutline, IoCartOutline } from "react-icons/io5";
import logo from "../assets/logo.png"; // Ensure this path is correct
import { CartContext } from "./CartContext"; // Import CartContext

const Nav = () => {
  const { cartItems } = useContext(CartContext); // Access cartItems from CartContext

  return (
    <div className="w-full bg-white">
      <div className="flex items-center justify-between px-6">
        {/* Left Section: Search Bar */}
        <div className="flex items-center border border-gray-300 rounded-full px-3 py-2 max-w-xs w-full">
          <CiSearch className="text-gray-500 text-lg" />
          <input
            type="text"
            placeholder="Search our store"
            className="outline-none flex-grow text-sm ml-2"
          />
        </div>

        {/* Center Section: Logo */}
        <div className="flex justify-center flex-grow">
          <img src={logo} className="w-60" alt="Logo" />
        </div>

        {/* Right Section: Icons */}
        <div className="flex items-center text-sm gap-6">
          <NavLink to="/login" className="relative">
            <IoPersonOutline className="text-2xl ml-2" />
          </NavLink>

          <NavLink to="/cart" className="relative">
            <IoCartOutline className="text-3xl" />
            {/* Display cart item count */}
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {cartItems.length}
              </span>
            )}
          </NavLink>
        </div>
      </div>

      <div className="flex justify-center gap-6 py-2 border-t border-gray-200">
        <NavLink to="/" className="text-sm text-gray-800 hover:text-gray-600">
          Home
        </NavLink>
        <NavLink
          to="/sale"
          className="text-sm text-gray-800 hover:text-gray-600"
        >
          SALE! %
        </NavLink>
        <NavLink
          to="/new-in"
          className="text-sm text-gray-800 hover:text-gray-600"
        >
          New in!
        </NavLink>
        <NavLink
          to="/collection"
          className="text-sm text-gray-800 hover:text-gray-600"
        >
          Shop
        </NavLink>
        <NavLink
          to="/reviews"
          className="text-sm text-gray-800 hover:text-gray-600"
        >
          Reviews
        </NavLink>
        <NavLink
          to="/contact"
          className="text-sm text-gray-800 hover:text-gray-600"
        >
          Contact us
        </NavLink>
      </div>
    </div>
  );
};

export default Nav;
