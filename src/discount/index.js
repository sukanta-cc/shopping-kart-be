const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const adminRouter = require("../middlewares/adminRoute");
const services = require("./services");

const router = express.Router();

router.use(verifyToken);
router.use(adminRouter);

/**
 * @route - POST /api/discounts
 * @description - Add a discount coupon
 */

router.post("/", (req, res) => {
	services
		.addDiscount(req)
		.then((result) => res.status(200).json(result))
		.catch((err) => res.status(err.status ?? 500).json(err));
});

/**
 * @route - GET /api/discounts
 * @description - Get all discount coupon
 */
router.get("/", (req, res) => {
	services
		.getDiscounts(req)
		.then((result) => res.status(200).json(result))
		.catch((err) => res.status(err.status ?? 500).json(err));
});

/**
 * @route - PUT /api/discounts/:discountId
 * @description - Update a discount coupon
 */
router.put("/:discountId", (req, res) => {
	services
		.updateDiscount(req)
		.then((result) => res.status(200).json(result))
		.catch((err) => res.status(err.status ?? 500).json(err));
});

/**
 * @route - DELETE /api/discounts/:discountId
 * @description - Delete a discount coupon
 */
router.delete("/:discountId", (req, res) => {
	services
		.deleteDiscount(req)
		.then((result) => res.status(200).json(result))
		.catch((err) => res.status(err.status ?? 500).json(err));
});

module.exports = router;
