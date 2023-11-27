const express = require("express");
const AuthRouter = require("../auth");
const UserRouter = require("../users");
const ProductRouter = require("../products");
const DiscountRouter = require("../discount");
const StoreRouter = require("../storeDetails");

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/users", UserRouter);
router.use("/products", ProductRouter);
router.use("/discounts", DiscountRouter);
router.use("/store", StoreRouter);

module.exports = router;