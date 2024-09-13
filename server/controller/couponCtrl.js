const Coupon = require("../models/couponModel");
const validateMongoDbId = require("../utils/validateMgdbId");
const asyncHandler = require("express-async-handler");

const createCoupon = asyncHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.json(newCoupon);
  } catch (error) {
    throw new Error(error);
  }
});
//get all coupon

const getallCoupons = asyncHandler(async (req, res) => {
  try {
    const Coupons = await Coupon.find();
    res.json(Coupons);
  } catch (error) {
    throw new Error(error);
  }
});
//updat
const updateCoupons = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatecoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatecoupon);
  } catch (error) {
    throw new Error(error);
  }
});

//delete
const deleteCoupons = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletecoupon = await Coupon.findByIdAndDelete(id);
    res.json(deletecoupon);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createCoupon, getallCoupons, updateCoupons, deleteCoupons };
