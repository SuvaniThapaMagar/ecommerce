import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forgotEmail, setForgotEmail] = useState(""); // State for forgot password email
  const [forgotMessage, setForgotMessage] = useState(""); // State for forgot password response message
  const [isForgotPassword, setIsForgotPassword] = useState(false); // State to toggle forgot password view
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current user data in localStorage:", localStorage.getItem("user"));
  }, []);

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting login with email:", email);
      const response = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful. Received data:", data);
        
        // Save the token and user info in localStorage
        localStorage.setItem("token", data.token);
        const userData = {
          _id: data._id,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          mobile: data.mobile,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        
        console.log("Stored user data in localStorage:", localStorage.getItem("user"));

        // Navigate to the home page or any other page after login
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        setError(errorData.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  // Function to handle forgot password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/user/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: forgotEmail }),
      });

      if (response.ok) {
        const data = await response.json();
        setForgotMessage(data.message || "Reset link sent to your email.");
        setForgotEmail(""); // Clear email input
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error sending reset email:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-16 p-6 w-full max-w-4xl">
        {/* Left Section: Login */}
        <div className="w-full md:w-96 p-8 bg-white ">
          <h1 className="text-xl font-bold mb-8 text-center">LOG IN TO YOUR ACCOUNT</h1>
          {!isForgotPassword ? (
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
                className="w-full py-2 mt-4 border-b border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black"
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
          ) : (
            <form onSubmit={handleForgotPassword}>
              <input
                type="email"
                placeholder="Enter your e-mail address"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full py-2 border-b border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black"
                required
              />
              <button
                type="submit"
                className="mt-6 w-full py-2 border border-black text-black font-bold text-sm"
              >
                SEND RESET LINK
              </button>
              {forgotMessage && <p className="text-green-500 text-sm mt-2">{forgotMessage}</p>}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
          )}
          <a
            href="#"
            className="block text-sm text-gray-600 mt-4 underline text-center"
            onClick={() => setIsForgotPassword(!isForgotPassword)}
          >
            {isForgotPassword ? "Back to login" : "Have you forgotten your password?"}
          </a>
        </div>

        {/* Right Section: Register */}
        <div className="w-full md:w-96 p-8 bg-white  flex flex-col justify-center items-center">
          <h1 className="text-xl font-bold mb-8 text-center">NEED AN ACCOUNT?</h1>
          <NavLink to="/signup" className="relative w-full">
            <button className="w-full py-2 border border-black text-black font-medium text-sm">
              REGISTER
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
