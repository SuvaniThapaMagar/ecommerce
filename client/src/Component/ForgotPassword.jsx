import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/user/forgot-pw-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Reset link sent to your email.");
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
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-96 p-8">
        <h1 className="text-xl font-bold mb-8">FORGOT PASSWORD</h1>
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Enter your e-mail address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-2 border-b border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black"
            required
          />
          <button
            type="submit"
            className="mt-6 w-full py-2 border border-black text-black font-bold text-sm"
          >
            SEND RESET LINK
          </button>
          {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
