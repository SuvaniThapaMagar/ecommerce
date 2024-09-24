import { NavLink } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100 p-6">
      {/* Greeting Section */}
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-4xl font-bold text-black">Hello, Admin!</h1>
      </div>

      {/* Dashboard Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Products Card */}
        <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
          <NavLink to="/admin-products" className="flex items-center space-x-4">
            <FaBoxOpen aria-label="Products" className="text-3xl text-orange-500" />
            <span className="text-xl font-semibold">Products</span>
          </NavLink>
        </div>

        {/* Orders Card */}
        <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
          <NavLink to="/admin-orders" className="flex items-center space-x-4">
            <IoBagHandle aria-label="Orders" className="text-3xl text-green-500" />
            <span className="text-xl font-semibold">Orders</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
