import { Route, Routes } from "react-router-dom";
import Description from "./Component/Descfription";
import Home from "./Component/Home";
import Cart from "./Component/Cart";
import Login from "./Component/Login";
import Orders from "./Component/Orders";
import Fashion from "./Component/Fashion";
import  CartProvider  from "./Component/CartContext";
import ContactUs from "./Component/ContactUS";
import Register from "./Component/Register.";
import AdminDashboard from "./adminComponent/adminHome";
import AdminProduct from "./adminComponent/adminProduct";
import AdminOrder from "./adminComponent/adminOrder";
import AdminHistory from "./adminComponent/adminHistory";
import AdminLogin from "./adminComponent/adminLogin";
import Gift from "./Component/Gift";
import Decor from "./Component/Decor";
import Accessories from "./Component/Accessories";
import Nav from "./Component/Nav";
import SalesPage from "./Component/Sale";
import AllProduct from "./Component/Collection";
import SearchResults from "./Component/searchResults";
import Profile from "./Component/Profile";





const App = () => {
  document.title = "Pixies World";
  
  return (
    
    <CartProvider> {/* Wrap your application with CartProvider */}
      <div className="flex flex-col">
        <Nav/>
      
        <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/search" element={<SearchResults />} />
         <Route path="/cart" element={<Cart />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Register />} />
         <Route path="/orders" element={<Orders />} />
         <Route path="/sale" element={<SalesPage />} />
         <Route path="/all-product" element={<AllProduct />} />
         <Route path="/products/category/fashion" element={<Fashion />} />
         <Route path="/products/category/accessories" element={<Accessories />} />
         <Route path="/products/category/decor" element={<Decor />} />
         <Route path="/products/category/gift" element={<Gift />} />
         
         <Route path="/contact" element={<ContactUs />} />
         <Route path="/description/:id" element={<Description />} />
 


             <Route path="/admin-dashboard" element={<AdminDashboard />} />
             <Route path="/admin-products" element={<AdminProduct />} />
             <Route path="/admin-orders" element={<AdminOrder />} />
             <Route path="/order-history" element={<AdminHistory />} />
             <Route path="/admin-login" element={<AdminLogin />} />



        </Routes>
      </div>
    </CartProvider>



  
  );
};

export default App;
