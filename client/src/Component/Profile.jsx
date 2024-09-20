import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

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

        // Set user data from the nested user object
        setUser(userResponse.data.user);

      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching your data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-6 mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{`${user.firstname || 'First Name'} ${user.lastname || 'Last Name'}`}</h2>
              <p className="text-gray-600">{user.email || 'Email not available'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
