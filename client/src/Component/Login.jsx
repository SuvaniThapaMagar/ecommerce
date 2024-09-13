import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Save the token and user info in localStorage
        localStorage.setItem("token", data.token); // Storing JWT token
        localStorage.setItem("user", JSON.stringify({
          _id: data._id,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          mobile: data.mobile,
        })); // Storing user info as a JSON string

        // Navigate to the home page or any other page after login
        navigate("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid credentials");
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    // Remove token and user info from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Optionally, you can also reset the state if required
    setEmail("");
    setPassword("");

    // Navigate back to the login page
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="flex space-x-16">
        {/* Left Section: Login */}
        <div className="w-96 p-8">
          <h1 className="text-xl font-bold mb-8">LOG IN TO YOUR ACCOUNT</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Enter your e-mail address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 border-b border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 border-b border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black"
              required
            />
            <button
              type="submit"
              className="mt-6 w-full py-2 border border-black text-black font-bold text-sm"
            >
              LOG IN
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
          <a href="#" className="block text-sm text-gray-600 mt-4 underline">
            Have you forgotten your password?
          </a>
        </div>

        {/* Right Section: Register and Logout */}
        <div className="w-96 p-8 flex flex-col justify-center">
          <h1 className="text-xl font-bold mb-8 text-center">NEED AN ACCOUNT?</h1>
          <NavLink to="/signup" className="relative">
            <button className="w-full py-2 border border-black text-black font-medium text-sm">
              REGISTER
            </button>
          </NavLink>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-4 w-full py-2 border border-red-600 text-red-600 font-medium text-sm"
          >
            LOG OUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
