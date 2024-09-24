import React, { useEffect, useState } from "react";
import {
  FaTruck,
  FaBoxOpen,
  FaShippingFast,
  FaRegStar,
  FaExclamationCircle,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";
import Nav from "./Nav";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const navigate = useNavigate(); 

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId || !token) {
        setError("You are not logged in.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:4000/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "An error occurred while fetching your data.");
        }

        setUser(data.user);
        setFormData({
          firstname: data.user.firstname,
          lastname: data.user.lastname,
          email: data.user.email,
          mobile: data.user.mobile,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, token]);

  const handleEditToggle = () => {
    setEditing((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/user/edituser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      const updatedUser = await response.json();
      setEditing(false);
      setUser({ ...user, ...formData }); // Update local state with new user data
    } catch (error) {
      console.error("Error updating user:", error);
      setError("An error occurred while updating your data.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return null;

  return (
    <div>
      <Nav />
      <div className="container mx-auto py-8 px-4">
        {/* Main User Info Section */}
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-bold">Hi, {user.firstname}</h1>
        </div>

        {/* My Orders Section */}
        <div className="border-black border-2 rounded-lg p-4 mt-4">
          <h2 className="text-lg font-bold">My Orders</h2>
          <div className="grid grid-cols-4 gap-4 mt-4 text-center">
            
            <div className="flex flex-col items-center">
              <FaTruck className="text-2xl" />
              <p>Processing</p>
            </div>
            <div className="flex flex-col items-center">
              <FaShippingFast className="text-2xl" />
              <p>Shipped</p>
            </div>
            
            <div className="flex flex-col items-center">
              <FaExclamationCircle className="text-2xl" />
              <p>Pending</p>
            </div>
            <div className="flex flex-col items-center">
              <FaTimesCircle className="text-2xl" />
              <p>Canceled</p>
            </div>
            <div className="flex flex-col items-center">
              <FaCheckCircle className="text-2xl" />
              <p>Delivered</p>
            </div>
          </div>
          <div className="text-center mt-4">
            <button
              onClick={() => navigate('/user-history')} // Use navigate here
              className="py-2 px-4 bg-black text-white rounded"
            >
              View All 
            </button>
          </div>
        </div>

        {/* Edit Profile Section */}
        <div className="border-black border-2 rounded-lg p-4 mt-4">
          <h2 className="text-lg font-bold">Edit Profile</h2>
          <div className="mt-4">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mb-4">
                <label className="text-lg">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="w-full py-5 border-b border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black"
                  disabled={!editing}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-lg">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="w-full py-5 border-b border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black"
                  disabled={!editing}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-lg">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full py-5 border-b border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black"
                  disabled={!editing}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-lg">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full py-5 border-b border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black"
                  disabled={!editing}
                />
              </div>
              {editing ? (
                <div>
                  <button
                    type="submit"
                    className="mt-6 w-full py-2 border border-black text-black font-medium text-sm"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleEditToggle}
                    className="ml-2 border px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleEditToggle}
                  className="mt-6 w-full py-2 border border-black text-black font-medium text-sm"
                >
                  Edit Profile
                </button>
              )}
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
