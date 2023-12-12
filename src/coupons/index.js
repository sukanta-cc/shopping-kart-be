const express = require("express");
const services = require("./services");
const verifyToken = require("../middlewares/verifyToken");
const adminRouter = require("../middlewares/adminRoute");

const router = express.Router();

router.use(verifyToken);

/**
 * @route - GET /api/coupons
 * @description - This api is used to get activated Coupons
 */
router.get("/", (req, res) => {
    services
        .getActivatedCoupons(req)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(err.status ?? 500).json(err));
});

/**
 * @route - GET /api/coupons/:code
 * @description - This api is used to get activated Coupon by coupon code
 */
router.get("/:code", (req, res) => {
    services
        .getCouponByCode(req)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(err.status ?? 500).json(err));
});

router.use(adminRouter);

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

/**
 * @route - POST /api/coupons/:couponId
 * @description - Update coupon
 */
router.post("/:couponId", (req, res) => {
    services
        .updateCoupon(req)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(err.status ?? 500).json(err));
});

/**
 * @route - GET /api/coupons
 * @description - This api is used to get all Coupons
 */
router.get("/", (req, res) => {
    services
        .getAllCoupons(req)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(err.status ?? 500).json(err));
});

module.exports = router;
