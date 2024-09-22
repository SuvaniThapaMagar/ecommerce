import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import Nav from './Nav';

const Edit = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <Nav/>
    <div className="container mx-auto py-10 px-4 flex justify-between items-start">
      {/* Left Section - User Info and Addresses */}
      <div className="w-full md:w-2/3 border-2 border-black p-6 rounded-lg">
        <h1 className="text-4xl font-bold">Nana</h1>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">ADDRESSES</h2>

          {/* Email Row */}
          <div className="flex justify-between items-center border-b border-gray-300 py-4">
            <span className="text-lg">EMAIL</span>
            <div className="flex items-center">
              <span className="text-lg">@gmail.com</span>
              <FaArrowRight className="ml-4" />
            </div>
          </div>

          {/* Change Password Row */}
          <div className="flex justify-between items-center border-b border-gray-300 py-4">
            <span className="text-lg">CHANGE PASSWORD</span>
            <div className="flex items-center">
              <span className="text-lg">********</span>
              <FaArrowRight className="ml-4" />
            </div>
          </div>

          {/* Sign Out and Delete Account */}
          <div className="mt-8">
            <button className="block text-lg underline mb-4">SIGN OUT</button>
            <button className="block text-lg underline text-red-500">DELETE YOUR ACCOUNT</button>
          </div>
        </div>
      </div>

      {/* Right Section - Profile Image Upload */}
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
        <div className="border-r-2 border-gray-200 h-full mr-8"></div>
        <div className="text-center">
          <img
            src={image || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="rounded-full h-32 w-32 object-cover mb-4"
          />
          <label className="block border-2 border-black py-2 px-4 rounded-lg cursor-pointer">
            SELECT IMAGE
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          <p className="text-sm text-gray-600 mt-2">FILE SIZE: MAXIMUM 1 MB</p>
          <p className="text-sm text-gray-600">FILE EXTENSION: JPEG, .PNG</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Edit;
