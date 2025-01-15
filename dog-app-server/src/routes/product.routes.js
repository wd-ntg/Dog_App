const express = require("express");
const router = express.Router();
const auth = require("../middleware/authenticate");
const productController = require("../controllers/productController");

// Product Routes
router.get("/", productController.getProducts);
router.post("/orders", productController.createOrder);
router.get("/best-seller", productController.getBestSeller);
router.get("/detail", productController.getDetailProduct);
router.get("/products-by-category", productController.getProductsByCategory);

module.exports = router;
