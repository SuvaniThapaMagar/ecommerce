import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoPersonOutline, IoCartOutline } from "react-icons/io5";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import logo from "../assets/logo.png";
import { CartContext } from "./CartContext";

const Nav = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(""); // Clear the search input
    }
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleProfileClick = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      alert("You need to login first to access your profile.");
      navigate("/login");
    } else {
      toggleProfileDropdown();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <div className="w-full bg-white shadow">
      <div className="flex items-center justify-between px-6 py-4 md:py-0">
        {/* Left Section: Search Bar */}
        <div className="hidden md:flex items-center border border-gray-300 rounded-full px-3 py-2 max-w-xs w-full">
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

        {/* Center Section: Logo */}
        <div className="flex justify-center flex-grow md:flex-grow-0" onClick={() => navigate("/")}>
          <img src={logo} className="hidden md:block w-48 cursor-pointer" alt="Logo" />
        </div>

        {/* Right Section: Icons */}
        <div className="hidden md:flex items-center text-sm gap-6">
          <div className="relative">
            <IoPersonOutline
              className="text-2xl ml-2 cursor-pointer"
              onClick={handleProfileClick}
            />
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                <NavLink to="/profile" className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-100">
                  Profile
                </NavLink>
                <NavLink to="/login" className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-100">
                  Login
                </NavLink>
                <button onClick={handleLogout} className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-100">
                  LOG OUT
                </button>
              </div>
            )}
          </div>

          <NavLink to="/cart" className="relative">
            <IoCartOutline className="text-3xl" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu}>
            {showMobileMenu ? (
              <HiOutlineX className="text-3xl" />
            ) : (
              <HiOutlineMenu className="text-3xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden flex flex-col items-center bg-white shadow-md py-4">
          <div className="w-full px-6">
            {/* Search bar in mobile menu */}
            <div className="flex items-center border border-gray-300 rounded-full px-3 py-2 w-full mb-4">
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

            {/* Navigation links */}
            <NavLink to="/" className="block text-sm text-gray-800 hover:text-gray-600 py-2">
              Home
            </NavLink>
            <NavLink to="/reviews" className="block text-sm text-gray-800 hover:text-gray-600 py-2">
              Reviews
            </NavLink>
            <NavLink to="/contact" className="block text-sm text-gray-800 hover:text-gray-600 py-2">
              Contact us
            </NavLink>

            {/* Profile and Cart icons in mobile menu */}
            <div className="flex items-center justify-center mt-4">
              <div className="relative">
                <IoPersonOutline
                  className="text-2xl ml-2 cursor-pointer"
                  onClick={handleProfileClick}
                />
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                    <NavLink to="/profile" className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-100">
                      Profile
                    </NavLink>
                    <NavLink to="/login" className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-100">
                      Login
                    </NavLink>
                    <button onClick={handleLogout} className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-100">
                      LOG OUT
                    </button>
                  </div>
                )}
              </div>

              <NavLink to="/cart" className="relative ml-6">
                <IoCartOutline className="text-3xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;