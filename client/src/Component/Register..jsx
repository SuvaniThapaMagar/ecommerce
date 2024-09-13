import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    mobile: ""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!formData.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
    
    if (!formData.password) errors.password = "Password is required";
    else if (formData.password.length < 6) errors.password = "Password must be at least 6 characters";
    
    if (!formData.firstname) errors.firstname = "First Name is required";
    if (!formData.lastname) errors.lastname = "Last Name is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      try {
        const response = await fetch("http://localhost:4000/api/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          // Handle non-2xx responses
          const errorData = await response.json();
          console.error("Error registering user:", errorData);
          return;
        }
  
        const data = await response.json();
        console.log(data);
        navigate("/login");
      } catch (error) {
        console.error("Error registering user:", error);
      }
    }
  };
  
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="flex space-x-16">
        <div className="w-96 p-8 ">
          <h1 className="text-xl font-bold mb-8">PERSONAL DETAILS</h1>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail"
            className="w-full py-5 border-b border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full py-5 border-b border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full py-5 border-b border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black"
          />
          {errors.firstname && <p className="text-red-500">{errors.firstname}</p>}
          
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full py-5 border-b border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black"
          />
          {errors.lastname && <p className="text-red-500">{errors.lastname}</p>}
          
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile "
            className="w-full py-5 border-b border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black"
          />

          <button onClick={handleSubmit} className="mt-6 w-full py-2 border border-black text-black font-medium text-sm">
            CREATE ACCOUNT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
