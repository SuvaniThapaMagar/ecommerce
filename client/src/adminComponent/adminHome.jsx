import Side from "./adminNav";
import { MdOutlineShoppingBag, MdOutlinePendingActions } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import adminhi from "../assets/adminhi.jpeg";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Side />

      {/* Main Content Area */}
      <div className="flex-1 bg-purple-50 p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Hi, Admin Card */}
        <div className="flex items-center bg-white shadow-md p-6 rounded-lg border h-40 mb-8">
          <div className="ml-4 flex-1">
            <p className="text-2xl font-semibold">Hi, Admin!</p>
          </div>
          {/* Image */}
          <img
            src={adminhi}
            alt="Admin Greeting"
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Orders Card */}
          <div className="flex items-center bg-white shadow-md p-6 rounded-lg border">
            <MdOutlineShoppingBag className="text-4xl text-orange-500 bg-orange-100 p-2 rounded-full" />
            <div className="ml-4">
              <p className="text-2xl font-semibold">23</p>
              <span className="text-gray-600">Orders</span>
            </div>
          </div>

          {/* Pending Card */}
          <div className="flex items-center bg-white shadow-md p-6 rounded-lg border">
            <MdOutlinePendingActions className="text-4xl text-blue-500 bg-blue-100 p-2 rounded-full" />
            <div className="ml-4">
              <p className="text-2xl font-semibold">23</p>
              <span className="text-gray-600">Pending</span>
            </div>
          </div>

          {/* Dispatch Card */}
          <div className="flex items-center bg-white shadow-md p-6 rounded-lg border">
            <TbTruckDelivery className="text-4xl text-green-500 bg-green-100 p-2 rounded-full" />
            <div className="ml-4">
              <p className="text-2xl font-semibold">23</p>
              <span className="text-gray-600">Dispatch</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
