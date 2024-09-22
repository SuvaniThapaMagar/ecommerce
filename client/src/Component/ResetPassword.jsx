import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/user/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setSuccess("Password reset successful! You can now log in.");
        setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-96 p-8">
        <h1 className="text-xl font-bold mb-8">RESET PASSWORD</h1>
        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-2 border-b border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black"
            required
          />
          <button
            type="submit"
            className="mt-6 w-full py-2 border border-black text-black font-bold text-sm"
          >
            RESET PASSWORD
          </button>
          {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
