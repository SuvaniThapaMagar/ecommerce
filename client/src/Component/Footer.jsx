import React from 'react';
import { FaInstagram, FaTiktok, FaPinterest, FaFacebookF, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-between">
          
         
          <div className="w-full md:w-1/2 lg:w-1/4 mb-6">
            <h3 className="font-bold mb-4">Contact Us</h3>
            <p>If you need assistance or have any questions, feel free to reach out to us via our contact form.</p>
            <p>Email: support@example.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
        </div>
       
        <div className="flex justify-center space-x-4 mt-8">
          <a href="https://instagram.com" className="text-2xl" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://tiktok.com" className="text-2xl" aria-label="TikTok"><FaTiktok /></a>
          <a href="https://pinterest.com" className="text-2xl" aria-label="Pinterest"><FaPinterest /></a>
          <a href="https://facebook.com" className="text-2xl" aria-label="Facebook"><FaFacebookF /></a>
          <a href="https://linkedin.com" className="text-2xl" aria-label="LinkedIn"><FaLinkedin /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;