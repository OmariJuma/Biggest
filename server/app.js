const express = require("express");
const path = require('path');
const productsRouter = require("./routes/products");
const productImagesRouter = require("./routes/productImages");
const categoryRouter = require("./routes/category");
const searchRouter = require("./routes/search");
const mainImageRouter = require("./routes/mainImages");
const userRouter = require("./routes/users");
const orderRouter = require("./routes/customer_orders");
const slugRouter = require("./routes/slugs");
const orderProductRouter = require('./routes/customer_order_product');
const wishlistRouter = require('./routes/wishlist');
var bodyParser = require("body-parser")
var cors = require("cors");
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productsRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/images", productImagesRouter);
app.use("/api/main-image", mainImageRouter);
app.use("/api/users", userRouter);
app.use("/api/search", searchRouter);
app.use("/api/orders", orderRouter);
app.use('/api/order-product', orderProductRouter);
app.use("/api/slugs", slugRouter);
app.use("/api/wishlist", wishlistRouter);
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 3001;
const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error)
  }

}
start()

