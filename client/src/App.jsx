import { Route, Routes } from "react-router-dom";
import Description from "./Component/Descfription";
import Home from "./Component/Home";
import Cart from "./Component/Cart";
import Login from "./Component/Login";
import Orders from "./Component/Orders";
import Fashion from "./Component/Fashion";
import CartProvider from "./Component/CartContext";
import ContactUs from "./Component/ContactUS";
import Register from "./Component/Register.";
import AdminDashboard from "./adminComponent/adminHome";
import AdminProduct from "./adminComponent/adminProduct";
import AdminOrder from "./adminComponent/adminOrder";
import AdminLogin from "./adminComponent/adminLogin";
import Gift from "./Component/Gift";
import Decor from "./Component/Decor";
import Accessories from "./Component/Accessories";
import SalesPage from "./Component/Sale";
import AllProduct from "./Component/Collection";
import SearchResults from "./Component/searchResults";
import Profile from "./Component/Profile";
import CheckoutPage from "./Component/Checkout";
import ForgotPassword from "./Component/ForgotPassword";
import ResetPassword from "./Component/ResetPassword";
import Edit from "./Component/Edit";
import ReviewPage from "./Component/Review";
import ProtectedRoute from "./ProtectedRoute"; // Import ProtectedRoute
import OrderHistory from "./Component/History";


const App = () => {
  document.title = "Pixies World";

  return (
    <CartProvider>
      <div className="flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user-history" element={<OrderHistory />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reviews" element={<ReviewPage />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/sale" element={<SalesPage />} />
          <Route path="/all-product" element={<AllProduct />} />
          <Route path="/products/category/fashion" element={<Fashion />} />
          <Route path="/products/category/accessories" element={<Accessories />} />
          <Route path="/products/category/decor" element={<Decor />} />
          <Route path="/products/category/gift" element={<Gift />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/description/:id" element={<Description />} />

          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Protected Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-products"
            element={
              <ProtectedRoute>
                <AdminProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-orders"
            element={
              <ProtectedRoute>
                <AdminOrder />
              </ProtectedRoute>
            }
          />
          
        </Routes>
      </div>
    </CartProvider>
  );
};

export default App;
