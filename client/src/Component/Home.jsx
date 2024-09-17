import collage from "../assets/collage.png";
import Items from "./Items";
import fashion from "../assets/fashion.jpg";
import deco from "../assets/deco.jpg";
import acc from "../assets/acc.jpg";
import gift from "../assets/gift.jpg";
import Bag from "./Bag";
import Footer from "./Footer";
import { NavLink } from "react-router-dom";

const Home = () => {
  // const user = JSON.parse(localStorage.getItem("user"));
// Access user's first name
  return (
     
    <div className="flex flex-col">
      <div
        className="flex h-[550px] w-full bg-cover bg-center items-center justify-center"
        style={{ backgroundImage: `url(${collage})` }}
      >
        <div className="flex flex-col">
          <div className="flex flex-wrap flex-col animate-slide-in gap-2">
            <div className="flex flex-row gap-4">
              <span className="text-2xl bg-white text-pink-400 px-1 ">
                SHOP
              </span>
              <span className="text-2xl bg-white text-pink-400 px-1 ">
                CUTE
              </span>
            </div>
            <div className="flex flex-row gap-4">
              <span className="text-2xl bg-white text-pink-400 px-1 ">
                LIVE
              </span>
              <span className="text-2xl bg-white text-pink-400 px-1 ">
                CUTE
              </span>
            </div>
          </div>
          <button className="bg-purple-400 text-white px-4 py-2 rounded-md mt-4">
            SHOP NOW
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center bg-gray-100 p-8 mt-28">
        <h2 className="text-lg font-semibold mb-6">Categories</h2>
        <div className="flex justify-center space-x-6">
          <div className="flex flex-col items-center">
            <NavLink
              to="/products/category/fashion"
              className="text-sm text-gray-800 hover:text-gray-600 "
            >
              <img
                src={fashion}
                className="w-20 h-20 rounded-full"
                alt="Fashion"
              />
              <span className="mt-2 text-sm">Fashion</span>
            </NavLink>
          </div>

          <div className="flex flex-col items-center">
            <NavLink
              to="/products/category/accessories"
              className="text-sm text-gray-800 hover:text-gray-600 "
            >
              <img
                src={acc}
                className="w-20 h-20 rounded-full"
                alt=""
              />
              <span className="mt-2 text-sm">Accessories</span>
            </NavLink>
          </div>

          <div className="flex flex-col items-center">
            <NavLink
              to="/products/category/home-decor"
              className="text-sm text-gray-800 hover:text-gray-600 "
            >
              <img
                src={deco}
                className="w-20 h-20 rounded-full"
                alt=""
              />
              <span className="mt-2 text-sm">Decorations</span>
            </NavLink>
          </div>

           <div className="flex flex-col items-center">
            <NavLink
              to="/products/category/gift"
              className="text-sm text-gray-800 hover:text-gray-600 "
            >
              <img
                src={gift}
                className="w-20 h-20 rounded-full"
                alt=""
              />
              <span className="mt-2 text-sm">Gifts</span>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="font-bold text-2xl text-center mt-8">Trending Now</div>
      <div className="flex gap-8 justify-center items-center mt-10">
        <Items />
        <Items />
        <Items />
        <Items />
        <Items />
      </div>

      <div className="flex flex-col items-center  bg-purple-100 p-8 mt-28">
        <div className="flex justify-evenly space-x-6 p-5">
          <div className="">
            <img
              src={deco}
              className="w-[350px] h-[370px] rounded-2xl"
              alt=""
            />
            <span className="text-pink-400 font-bold">CUTE HOME DECOR</span>
            <p className="">Make your home cute and lively</p>
            <button className="bg-blue-500 rounded-md p-3 mt-6  text-white">
              SHOP NOW
            </button>
          </div>
          <div className="">
            <img
              src={deco}
              className="w-[350px] h-[370px] rounded-2xl"
              alt=""
            />
            <span className="text-pink-400 font-bold">CUTE HOME DECOR</span>
            <p className="">Make your home cute and lively</p>
            <button className="bg-blue-500 rounded-md p-3 mt-6  text-white">
              SHOP NOW
            </button>
          </div>
          <div className="">
            <img
              src={deco}
              className="w-[350px] h-[370px] rounded-2xl"
              alt=""
            />
            <span className="text-pink-400 font-bold">CUTE HOME DECOR</span>
            <p className="">Make your home cute and lively</p>
            <button className="bg-blue-500 rounded-md p-3 mt-6  text-white">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
      <div className="">
        <h1>BAGS AND BACKPACKS</h1>
        <Bag />
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
