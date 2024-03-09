const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const jwtVerify = require("../middlewares/isAuth");
const { isAdmin } = require("../middlewares/isAdmin");
const uploadImage = require("../middlewares/uploadProdImage");

router.get("/products/:id?", productController.getProduct);

router.post("/products", uploadImage, productController.createProduct);

router.put(
  "/products/:id",
  uploadImage,
  [jwtVerify, isAdmin],
  productController.updateProduct
);

router.delete(
  "/products/:id",
  [jwtVerify, isAdmin],
  productController.deleteProduct
);

module.exports = router;
