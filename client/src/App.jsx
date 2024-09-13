import { Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import Collection from "./Component/Collection";
import Cart from "./Component/Cart";
import About from "./Component/About";
import Login from "./Component/Login";
import Orders from "./Component/Orders";
import Fashion from "./Component/Fashion";
import { CartProvider } from "./Component/CartContext";
import Register from "./Component/Register.";
import AdminDashboard from "./adminComponent/adminHome";
import AdminProduct from "./adminComponent/adminProduct";
import AdminOrder from "./adminComponent/adminOrder";
import AdminHistory from "./adminComponent/adminHistory";
import AdminLogin from "./adminComponent/adminLogin";
const App = () => {
  document.title = "Pixies World";
  
  return (
    
    <CartProvider> {/* Wrap your application with CartProvider */}
      <div className="flex flex-col">
      
        <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/collection" element={<Collection />} />
         <Route path="/about" element={<About />} />
         <Route path="/cart" element={<Cart />} />
         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Register />} />
         <Route path="/orders" element={<Orders />} />
         <Route path="/fashion" element={<Fashion />} />

             <Route path="/admin-dashboard" element={<AdminDashboard />} />
             <Route path="/admin-products" element={<AdminProduct />} />
             <Route path="/admin-orders" element={<AdminOrder />} />
             <Route path="/order-history" element={<AdminHistory />} />
             <Route path="/admin-login" element={<AdminLogin />} />


        </Routes>
      </div>
    //</CartProvider>



  
  );
};

export default App;
