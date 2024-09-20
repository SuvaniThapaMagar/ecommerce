import { MdDashboard } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

const Side = () => {
  return (
    <div className="flex flex-col w-64 h-screen bg-white p-6">
      {/* Logo Section */}
      <div className="flex items-center mb-12">
        <img src={logo} className="w-28" alt="Logo" />
      </div>

      {/* Navigation Section */}
      <div className="flex flex-col space-y-8">
        {/* Dashboard Link */}
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            isActive
              ? "flex items-center space-x-3 text-blue-500 font-bold"
              : "flex items-center space-x-3"
          }
        >
          <MdDashboard aria-label="Dashboard" className="text-2xl" />
          <span>Dashboard</span>
        </NavLink>

        {/* Products Link */}
        <NavLink
          to="/admin-products"
          className={({ isActive }) =>
            isActive
              ? "flex items-center space-x-3 text-blue-500 font-bold"
              : "flex items-center space-x-3"
          }
        >
          <FaBoxOpen aria-label="Products" className="text-2xl" />
          <span>Products</span>
        </NavLink>

        {/* Orders Link */}
        <NavLink
          to="/admin-orders"
          className={({ isActive }) =>
            isActive
              ? "flex items-center space-x-3 text-blue-500 font-bold"
              : "flex items-center space-x-3"
          }
        >
          <IoBagHandle aria-label="Orders" className="text-2xl" />
          <span>Orders</span>
        </NavLink>

        {/* History Link */}
        <NavLink
          to="/order-history"
          className={({ isActive }) =>
            isActive
              ? "flex items-center space-x-3 text-blue-500 font-bold"
              : "flex items-center space-x-3"
          }
        >
          <FaHistory aria-label="History" className="text-2xl" />
          <span>History</span>
        </NavLink>
        
      </div>
    </div>
  );
};

export default Side;
