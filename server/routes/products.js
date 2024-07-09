const express = require("express");

const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductById,
} = require("../controllers/products");
const { checkToken } = require("../middleware/jwt");
const { imageUpload } = require("../middleware/imageUpload");

router.route("/").get(getAllProducts).post(checkToken, imageUpload,createProduct);


router
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
