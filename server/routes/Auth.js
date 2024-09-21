const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
} = require("../controller/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
router.post("/register", createUser);
router.post("/forgot-pw-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);

router.put("/password", authMiddleware, updatePassword); // with help of authmiddleware, getting req.user and without that id cant find user
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);

router.get("/allusers", getallUser);


router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);


router.get("/:id",authMiddleware, getaUser)
router.get("/:id", authMiddleware, isAdmin, getaUser);

router.delete("/:id", deleteaUser);


router.put("/edituser", authMiddleware, updatedUser);


module.exports = router;
