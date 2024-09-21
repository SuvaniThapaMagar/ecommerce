const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const authRouter = require("./routes/Auth");
const productRouter = require("./routes/productRoute");
const couponRouter = require("./routes/couponRoute");
const categoryRouter = require("./routes/categoryRout");
const cartRouter = require("./routes/cartRoutes"); // New Cart Route
const cors = require('cors');

dotenv.config(); // Load environment variables
dbConnect(); // Connect to the database

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: 'http://localhost:5173', // Update this to match your frontend URL
  credentials: true // Allow credentials
}));

// Middleware for logging requests
app.use(morgan("dev"));

// Middleware for parsing JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware for parsing cookies
app.use(cookieParser());

// Serve static files from the public directory (optional)
app.use(express.static("public"));

// Define API routes
app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/cart", cartRouter); // Add Cart Route

// Middleware for handling 404 errors (Not Found)
app.use(notFound);

// Middleware for handling other errors
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
