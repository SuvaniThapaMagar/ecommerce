import collage from "../assets/collage.png";
import fashion from "../assets/fashion.jpg";
import deco from "../assets/deco.jpg";
import acc from "../assets/acc.jpg";
import gift from "../assets/gift.jpg";
import cloh from '../assets/cloh.jpeg';
import coqqe from '../assets/coqqe.jpg';

import Footer from "./Footer";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div
        className="flex h-[550px] w-full bg-cover bg-center items-center justify-center"
        style={{ backgroundImage: `url(${collage})` }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-wrap justify-center animate-slide-in gap-2">
            <div className="flex flex-row gap-4">
              <span className="text-2xl bg-white text-pink-400 px-1">SHOP</span>
              <span className="text-2xl bg-white text-pink-400 px-1">CUTE</span>
            </div>
            <div className="flex flex-row gap-4">
              <span className="text-2xl bg-white text-pink-400 px-1">LIVE</span>
              <span className="text-2xl bg-white text-pink-400 px-1">CUTE</span>
            </div>
          </div>
          <NavLink to="/all-product">
            <button className="bg-purple-400 text-white px-4 py-2 rounded-md mt-4">
              SHOP NOW
            </button>
          </NavLink>
        </div>
      </div>

      {/* Categories Section */}
      <div className="flex flex-col items-center bg-gray-100 p-8 mt-10 md:mt-28">
        <h2 className="text-lg font-semibold mb-6">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { to: "/products/category/fashion", img: fashion, label: "Fashion" },
            { to: "/products/category/accessories", img: acc, label: "Accessories" },
            { to: "/products/category/decor", img: deco, label: "Decorations" },
            { to: "/products/category/gift", img: gift, label: "Gifts" },
          ].map((category) => (
            <div className="flex flex-col items-center" key={category.label}>
              <NavLink to={category.to} className="text-sm text-gray-800 hover:text-gray-600">
                <img src={category.img} className="w-20 h-20 rounded-full" alt={category.label} />
                <span className="mt-2 text-sm">{category.label}</span>
              </NavLink>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="flex flex-col items-center bg-purple-100 p-8 mt-10 md:mt-28">
        <h2 className="text-lg font-semibold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { img: deco, label: "CUTE HOME DECOR", desc: "Make your home cute and lively", to: "/products/category/decor" },
            { img: coqqe, label: "CUTE ACCESSORIES", desc: "Be cute and lively", to: "/products/category/accessory" },
            { img: cloh, label: "CUTE CLOTHES", desc: "Shop cute Be cute", to: "/products/category/fashion" },
          ].map((product) => (
            <div className="flex flex-col items-center" key={product.label}>
              <img src={product.img} className="w-full h-[370px] rounded-2xl object-cover" alt={product.label} />
              <span className="text-pink-400 font-bold mt-2">{product.label}</span>
              <p className="text-center">{product.desc}</p>
              <NavLink to={product.to}>
                <button className="bg-blue-500 rounded-md p-3 mt-4 text-white">
                  SHOP NOW
                </button>
              </NavLink>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
