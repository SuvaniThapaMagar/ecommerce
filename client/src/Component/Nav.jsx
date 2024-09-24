import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoPersonOutline, IoCartOutline } from "react-icons/io5";
import logo from "../assets/logo.png"; // Ensure this path is correct
import { CartContext } from "./CartContext"; // Import CartContext

const Nav = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount } = useContext(CartContext); // Use cartCount from context
  const navigate = useNavigate(); // Import useNavigate for programmatic navigation
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/product?search=${searchQuery}`
      );
      const data = await response.json();
      // Set the searched products in your state (e.g., setProducts(data))
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleProfileClick = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")); // Fetch user from localStorage
    if (!storedUser) {
      alert("You need to login first to access your profile.");
      navigate("/login"); // Redirect to login page if not logged in
    } else {
      toggleProfileDropdown(); // Toggle the dropdown if logged in
    }
  };

  const handleLogout = () => {
    console.log(
      "Logging out. Current user data:",
      localStorage.getItem("user")

    );

    // Remove token and user info from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    console.log("After logout. User data:", localStorage.getItem("user"));

    // Optionally, you can also reset the state if required
    setEmail("");
    setPassword("");

    // Navigate back to the login page
    navigate("/");
  };

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            onClick={handleSearch}
            className="ml-2 px-3 py-1 bg-black text-white rounded"
          >
            Search
          </button>
        </div>

        <div
          className="flex justify-center flex-grow"
          onClick={() => navigate("/")}
        >
          <img src={logo} className="w-60 cursor-pointer" alt="Logo" />
        </div>

        {/* Right Section: Icons */}
        <div className="flex items-center text-sm gap-6">
          <div className="relative">
            <IoPersonOutline
              className="text-2xl ml-2 cursor-pointer"
              onClick={handleProfileClick} // Change the click handler
            />
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                <NavLink
                  to="/profile"
                  className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/login"
                  className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-100"
                >
                  Login
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-100"
                >
                  LOG OUT
                </button>
              </div>
            )}
          </div>

          <NavLink to="/cart" className="relative">
            <IoCartOutline className="text-3xl" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {cartCount} {/* Show cart count */}
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
