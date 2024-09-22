import React from 'react';
import { FaInstagram, FaTiktok, FaPinterest, FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-pink-50 text-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">WANT AN EXTRA 10% OFF?</h2>
          <p className="mb-4">
            SUBSCRIBE TO OUR NEWSLETTER AND BE THE FIRST TO KNOW ABOUT THE LATEST NEWS, FUN BLOGS,
            SALES AND DISCOUNTS, PLUS GET A WELCOME DISCOUNT CODE IN YOUR EMAIL INBOX RIGHT NOW..
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="ENTER EMAIL HERE"
              className="flex-grow border-b border-gray-300 bg-transparent py-2 px-4 focus:outline-none"
            />
            <button className="bg-black text-white px-6 py-2 ml-4">
              SUBSCRIBE
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 lg:w-1/4 mb-6">
            <h3 className="font-bold mb-4">USEFUL LINKS</h3>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">ABOUT US</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">SIZING CHART</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">SHIPPING & DELIVERY</a></li>
            </ul>
          </div>
          
          <div className="w-full md:w-1/2 lg:w-1/4 mb-6">
            <h3 className="font-bold mb-4">CONTACT US</h3>
            <p>NEED HELP OR HAVE A QUESTION?</p>
            <p>CONTACT USING OUR CONTACT FORM.</p>
          </div>
        </div>
        
        <div className="flex justify-center space-x-4 mt-8">
          <a href="#" className="text-2xl"><FaInstagram /></a>
          <a href="#" className="text-2xl"><FaTiktok /></a>
          <a href="#" className="text-2xl"><FaPinterest /></a>
          <a href="#" className="text-2xl"><FaFacebookF /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;