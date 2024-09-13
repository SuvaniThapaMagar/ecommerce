const { generateToken } = require("../config/jwtToken");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMgdbId");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const sendEmail = require("../controller/emailCtrl");
const crypto = require("crypto");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");
//create a user
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    //create new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User Already Exists");
  }
});

const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  //check user exist
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

//adminlogin
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check user exist
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("Not Authorized");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});
//handle refreshtoken
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  console.log("Cookies:", cookie); // Log cookies for debugging
  if (!cookie?.refreshToken) {
    res.status(401);
    throw new Error("No Refresh Token in Cookies");
  }

  const refreshToken = cookie.refreshToken;
  console.log("Refresh Token:", refreshToken); // Log refresh token for debugging

  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.status(401);
    throw new Error("No Refresh Token present in db or not matched");
  }

  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      console.error("Token Verification Error:", err); // Log error details
      res.status(401);
      throw new Error("There is something wrong with refresh token");
    }

    const accessToken = generateToken(user._id);
    res.json({ accessToken });
  });
});

//logout

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    res.status(401);
    throw new Error("No Refresh Token in Cookies");
  }
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); //forbidden
  }
  // Update the user document to remove the refresh token
  await User.findOneAndUpdate(
    { _id: user._id }, // Correct filter
    { refreshToken: "" },
    { new: true }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204);
});

//updste
const updatedUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastnamename: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json({
      updatedUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//save user Address
const saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

//get all user
const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

//get single user
const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaUser = await User.findById(id);
    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//get delete user
const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});
// Block User Controller
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
    if (!block) {
      res.status(404);
      throw new Error("User not found");
    }
    res.json({
      message: "User Blocked",
      user: block,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Unblock User Controller
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );
    if (!unblock) {
      res.status(404);
      throw new Error("User not found");
    }
    res.json({
      message: "User Unblocked",
      user: unblock,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body; // Extracting the password from the request body

  validateMongoDbId(_id); // Validate the user ID
  const user = await User.findById(_id); // Find the user by ID

  if (password && typeof password === "string") {
    // Ensure password is a string
    user.password = password; // Set the new password
    const updatedPassword = await user.save(); // Save the updated user
    res.json(updatedPassword); // Respond with the updated user
  } else if (!password) {
    res.json(user); // If no password is provided, return the user as is
  } else {
    res.status(400).json({ error: "Invalid password format." }); // Handle invalid password format
  }
});
const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ message: "User not found with this email" });
    return;
  }

  try {
    const token = await user.createPasswordResetToken();
    await user.save(); // Save the user after generating the token

    const resetURL = `Hi, Please follow this link to reset your password. This is valid till 10 min from now. <a href='http://localhost:4000/api/user/reset-password/${token}'>Click Here</a>`;
    const data = {
      to: "sujixchan760@gmail.com", // Replace with your own valid email address
      subject: "Forgot Password Link",
      html: resetURL,
    };
    await sendEmail(data);
    res.json({ token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
});
//reset
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  if (!password || !token) {
    return res
      .status(400)
      .json({ message: "Password and token are required." });
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error("Token Expired, Please try again later");
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.json({ message: "Password reset successful" });
});

const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

const mongoose = require("mongoose");

const userCart = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const { cart } = req.body;
  if (!cart || cart.length === 0) {
    return res.status(400).json({ message: "Cart is empty or invalid" });
  }

  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    let products = [];
    const user = await User.findById(_id);

    // Check if user already has a product in the cart
    const alreadyExistCart = await Cart.findOne({ orderby: user._id });
    if (alreadyExistCart) {
      await alreadyExistCart.deleteOne();
    }

    for (let i = 0; i < cart.length; i++) {
      let object = {};

      // Validate if the product ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(cart[i]._id)) {
        return res
          .status(400)
          .json({ message: `Invalid product ID: ${cart[i]._id}` });
      }

      const product = await Product.findById(cart[i]._id)
        .select("price")
        .exec();

      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${cart[i]._id} not found` });
      }

      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.color = cart[i].color;
      object.price = product.price;
      products.push(object);
    }

    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal += products[i].price * products[i].count;
    }

    let newCart = await new Cart({
      products,
      cartTotal,
      orderby: user._id,
    }).save();

    res.json(newCart);
  } catch (error) {
    console.error("Error in userCart:", error.message);
    res
      .status(500)
      .json({ message: "Something went wrong while processing the cart" });
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const cart = await Cart.findOne({ orderby: _id }).populate(
      "products.product"
    );
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

//empty cart
const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    // Find the user by ID
    const user = await User.findById(_id);

    // Remove the cart associated with the user
    const cart = await Cart.findOneAndDelete({ orderby: user._id });

    // Respond with the deleted cart or an appropriate message
    res.json(
      cart
        ? { message: "Cart has been emptied", cart }
        : { message: "No cart found" }
    );
  } catch (error) {
    throw new Error(error);
  }
});

const applyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);

  const validCoupon = await Coupon.findOne({ name: coupon });
  if (!validCoupon) {
    throw new Error("Invalid Coupon");
  }

  const user = await User.findById(_id);
  const userCart = await Cart.findOne({ orderby: user._id }).populate(
    "products.product"
  );

  const cartTotal = userCart.cartTotal;
  const totalAfterDiscount = parseFloat(
    (cartTotal - (cartTotal * validCoupon.discount) / 100).toFixed(2)
  );

  const updatedCart = await Cart.findOneAndUpdate(
    { orderby: user._id },
    { totalAfterDiscount },
    { new: true }
  );

  res.json({ totalAfterDiscount: updatedCart.totalAfterDiscount });
});

const createOrder = asyncHandler(async (req, res) => {
  const { COD, couponApplied } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    if (!COD) throw new Error("Create cash order failed");

    const user = await User.findById(_id);
    const userCart = await Cart.findOne({ orderby: user._id });

    const finalAmount =
      couponApplied && userCart.totalAfterDiscount
        ? userCart.totalAfterDiscount
        : userCart.cartTotal;

    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmount,
        status: "Cash on Delivery",
        created: Date.now(),
        currency: "usd",
      },
      orderby: user._id,
      orderStatus: "Cash on Delivery",
    }).save();

    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });

    const updated = await Product.bulkWrite(update, {});
    res.json({ message: "success" });
  } catch (error) {
    throw new Error(error);
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const userorders = await Order.findOne({ orderby: _id })
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});





const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      { new: true }
    );
    res.json(updateOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus
};
