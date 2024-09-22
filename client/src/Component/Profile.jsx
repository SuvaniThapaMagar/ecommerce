import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserEdit, FaGift, FaWallet, FaTags, FaTruck, FaBoxOpen, FaShippingFast, FaRegStar } from 'react-icons/fa';
import axios from 'axios';
import Edit from './Edit';
import Nav from './Nav';


const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        const userResponse = await axios.get(`http://localhost:4000/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(userResponse.data.user);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching your data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return null;

  return (
    <div>
      <Nav/>
    <div className="container mx-auto py-8 px-4">
      {/* Main User Info Section */}
      <div className="border-black border-2 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="rounded-full h-24 w-24 object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold">Hi, {user.firstname}</h1>
          </div>
        </div>
        <button className="text-gray-600 hover:underline flex items-center space-x-2">
          <FaUserEdit />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Coupons, Points, Wallet, and Gift Card Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <div className="border-black border-2 p-4 rounded-lg flex flex-col items-center">
          <FaTags className="text-2xl" />
          <p className="mt-2">Coupons</p>
        </div>
        <div className="border-black border-2 p-4 rounded-lg flex flex-col items-center">
          <FaRegStar className="text-2xl" />
          <p className="mt-2">Points</p>
        </div>
        <div className="border-black border-2 p-4 rounded-lg flex flex-col items-center">
          <FaWallet className="text-2xl" />
          <p className="mt-2">Wallet</p>
        </div>
        <div className="border-black border-2 p-4 rounded-lg flex flex-col items-center">
          <FaGift className="text-2xl" />
          <p className="mt-2">Gift Card</p>
        </div>
      </div>

      {/* Join Section */}
      <div className="border-black border-2 p-4 rounded-lg mt-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">PIXIESWORLD</h2>
          <p className="text-sm">Join our club to get a 5% discount and shipping coupon.</p>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded">Join Now</button>
      </div>

      {/* My Orders Section */}
      <div className="border-black border-2 rounded-lg p-4 mt-4">
        <h2 className="text-lg font-bold">My Orders</h2>
        <div className="grid grid-cols-4 gap-4 mt-4 text-center">
          <div className="flex flex-col items-center">
            <FaBoxOpen className="text-2xl" />
            <p>Unpaid</p>
          </div>
          <div className="flex flex-col items-center">
            <FaTruck className="text-2xl" />
            <p>Processing</p>
          </div>
          <div className="flex flex-col items-center">
            <FaShippingFast className="text-2xl" />
            <p>Shipped</p>
          </div>
          <div className="flex flex-col items-center">
            <FaRegStar className="text-2xl" />
            <p>Review</p>
          </div>
        </div>
      </div>

      {/* Recently Viewed Section */}
      <div className="border-black border-2 rounded-lg p-4 mt-4">
        <h2 className="text-lg font-bold">Recently Viewed</h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <img
            src="https://via.placeholder.com/150"
            alt="Recently Viewed"
            className="rounded-lg"
          />
          <img
            src="https://via.placeholder.com/150"
            alt="Recently Viewed"
            className="rounded-lg"
          />
          <img
            src="https://via.placeholder.com/150"
            alt="Recently Viewed"
            className="rounded-lg"
          />
        </div>
      </div>

      {/* You May Also Like Section */}
      <div className="border-black border-2 rounded-lg p-4 mt-4">
        <h2 className="text-lg font-bold">You May Also Like</h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <img
            src="https://via.placeholder.com/150"
            alt="You May Also Like"
            className="rounded-lg"
          />
          <img
            src="https://via.placeholder.com/150"
            alt="You May Also Like"
            className="rounded-lg"
          />
          <img
            src="https://via.placeholder.com/150"
            alt="You May Also Like"
            className="rounded-lg"
          />
        </div>
      </div>
      <Edit/>
    </div>
    </div>
  );
};

export default Profile;
