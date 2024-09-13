import Image from "../assets/pink.jpeg";
import { FaHeart } from "react-icons/fa"; // Import the heart icon from react-icons

const Items = () => {
  return (
    <div className="w-[200px]">
      <div
        className="relative flex h-[190px] w-[200px] bg-cover bg-center rounded-2xl"
        style={{ backgroundImage: `url(${Image})` }}
      >
        {/* Heart Icon in Top Left */}
        <button className="absolute top-2 left-2 bg-white p-1 rounded-full shadow-md">
          <FaHeart className="w-5 h-5" />
        </button>

        {/* "On Sale" Button in Top Right */}
        <button className="absolute top-2 right-2 bg-pink-400 text-white rounded-lg px-2 py-1">
          On Sale
        </button>
      </div>
      <div className="">
        Shopping description which will have the item description
      </div>
      <div className="">
        From <span className="text-lg text-pink-300">The price is noted here</span>
      </div>
    </div>
  );
};

export default Items;
