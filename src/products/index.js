const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const adminRouter = require("../middlewares/adminRoute");
const services = require("./services");
const upload = require("../utils/upload");
const { check } = require("express-validator");
const {
    cartValidationRule,
    orderValidationRule,
    orderStatusValidationRule,
    productAddValidationRule,
    productUpdateValidationRule,
} = require("./validation");
const errorValidate = require("../middlewares/errorValidate");

const router = express.Router();

router.use(verifyToken);

/**
 * @route - GET /api/products
 * @description - Getting a list of products with filters and search parameters
 */
router.get("/", (req, res) => {
    services
        .getProducts(req)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(err.status ?? 500).json(err));
});

/**
 * @route - GET /api/products/:productId
 * @description - Getting a product details
 */
router.get("/:productId", (req, res) => {
    services
        .getProductDetails(req)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(err.status ?? 500).json(err));
});

/**
 * @route - GET /api/products/featured
 * @description - Getting featured products
 */
router.get("/featured", (req, res) => {
    services
        .getFeaturedProducts()
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(err.status ?? 500).json(err));
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Starting of cart routes~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * @route - POST /api/products/carts
 * @description - This route will be use for adding products to cart
 */
router.post("/carts", cartValidationRule, errorValidate, (req, res) => {
    services
        .addToCart(req)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(err.status ?? 500).json(err));
});

/**
 * @route - GET /api/products/carts
 * @description - This route will be use for getting cart values
 */
router.get("/carts", (req, res) => {
    services
        .getCarts(req)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(err.status ?? 500).json(err));
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Ending of cart routes~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Starting of order routes~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * @route - GET /api/products/orders
 * @description - This route will create a new order
 */
router.post("/orders", orderValidationRule, errorValidate, (req, res) => {
    services
        .createOrder(req)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(err.status ?? 500).json(err));
});

/**
 * @route - GET /api/products/orders/:orderId
 * @description - This route will use to update order status
 * @param {string} - orderId
 */
router.patch(
    "/orders/:orderId",
    orderStatusValidationRule,
    errorValidate,
    (req, res) => {
        services
            .orderStatusUpdate(req)
            .then((result) => res.status(200).json(result))
            .catch((err) => res.status(err.status ?? 500).json(err));
    }
);

/**
 * @route - GET /api/products/orders
 * @description - This route will be used to get user orders
 */
router.get("/orders", (req, res) => {
    services
        .getOrders(req)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(err.status ?? 500).json(err));
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Starting of order routes~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Starting of admin routes~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

router.use(adminRouter);

/**
 * @route - POST /api/products
 * @description - This route will be use to add product
 * @body - name, description, productCode, featured
 */
router.post("/", upload.array("images", 8), (req, res) => {
    services
        .addProduct(req)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(err.status ?? 500).json(err));
});

/**
 * @route - POST /api/products/:productId
 * @description - This route will be use to update product
 * @body - name, description, productCode, featured
 */
router.post("/:productId", upload.array("images", 8), (req, res) => {
    services
        .updateProduct(req)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(err.status ?? 500).json(err));
});

/**
 * @route - PATCH /api/products/:productId
 * @description - This route will be use for changing product status
 * @params - productId
 */
router.patch("/:productId", (req, res) => {
    services
        .changeProductStatus(req)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(err.status ?? 500).json(err));
});

/**
 * @route - PATCH /api/products/feature-product/:productId
 * @description - This route will be use for making featured product
 */
router.patch("/feature-product/:productId", (req, res) => {
    services
        .setFeaturedProductStatus(req)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(err.status ?? 500).json(err));
});

/**
 * @route - DELETE /api/products/:productId
 * @description - This route will delete multiple products
 */
router.delete("/:productId", (req, res) => {
    services
        .deleteProducts(req)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(err.status ?? 500).json(err));
});

/**
 * @route - GET /api/products/orders
 * @description - This route will be used to get all orders
 */
router.get("/orders", (req, res) => {
    services
        .getAllOrders(req)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(err.status ?? 500).json(err));
});

/**
 * @route - GET /api/products/orders/:orderId
 * @description - This route will return order details
 */
router.get("/orders/:orderId", (req, res) => {
    services
        .getOrderDetails(req)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(err.status ?? 500).json(err));
});

/**
 * @route - PUT /api/products/cancel-order
 * @description - this route will be use to cancel order
 */
router.put("/cancel-order", (req, res) => {
    services
        .cancelOrder(req)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(err.status ?? 500).json(err));
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Ending of admin routes~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

module.exports = router;
