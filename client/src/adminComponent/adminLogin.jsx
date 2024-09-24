import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/user/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Error logging in");
      }

      const data = await response.json();
      console.log("Admin logged in:", data);
      
      // Store the token in localStorage
      localStorage.setItem("adminToken", data.token); // Save token

      // Navigate to admin dashboard upon successful login
      navigate("/admin-dashboard"); // Adjust this path based on your routing
    } catch (error) {
      console.error("Error logging in as admin:", error);
    }
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

          
      </div>
    </div>
  );
};

export default AdminLogin;
