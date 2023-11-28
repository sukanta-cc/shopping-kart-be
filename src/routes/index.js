const express = require("express");
const AuthRouter = require("../auth");
const UserRouter = require("../users");
const ProductRouter = require("../products");
const CouponRouter = require("../coupons");
const DiscountRouter = require("../discount");
const StoreRouter = require("../storeDetails");
const services = require("../storeDetails/services");

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/users", UserRouter);
router.use("/products", ProductRouter);
router.use("/coupons", CouponRouter);
router.use("/discounts", DiscountRouter);
router.use("/store", StoreRouter);

router.get("/images", (req, res) => {
	services.getImage(req, res);
});

module.exports = router;
