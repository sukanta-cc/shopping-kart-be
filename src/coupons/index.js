const express = require("express");
const services = require("./services");

const router = express.Router();

/**
 * @route - POST /api/coupons
 * @description - Create a new coupon
 */
router.post("/", (req, res) => {
	services
		.createCoupon(req)
		.then((result) => res.status(200).json(result))
		.catch((err) => res.status(err.status ?? 500).json(err));
});

/**
 * @route - PUT /api/coupons
 * @description - Update a coupon status
 */
router.put("/", (req, res) => {
	services
		.changeCouponStatus(req)
		.then((result) => res.status(200).json(result))
		.catch((err) => res.status(err.status ?? 500).json(err));
});

module.exports = router;
