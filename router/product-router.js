const express = require("express")
const router = express.Router();
const {getAllProducts,getAllProductsById,addProduct} = require("../controllers/product-controller")

router.route("/getAllProducts").get(getAllProducts);
router.route("/addProduct").post(addProduct);
router.route("/getAllProductsById/:id").get(getAllProductsById);

module.exports = router;