const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const adminRouter = require("../middlewares/adminRoute");
const services = require("./services");

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
      .catch((err) => res.status(err.status?? 500).json(err));
})

// Below this route will be admin routes

router.use(adminRouter);

/**
 * @route - POST /api/products
 * @description - This route will be use to add product
 * @body - name, description, productCode, featured
 */
router.post("/", (req, res) => {
	services
		.addProduct(req)
		.then((result) => res.status(200).json(result))
		.catch((err) => res.status(err.status ?? 500).json(err));
});

/**
 * @route - PUT /api/products/:productId
 * @description - This route will be use to update product
 * @body - name, description, productCode, featured
 */
router.put("/:productId", (req, res) => {
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
 * @route - DELETE /api/products
 * @description - This route will delete multiple products
 * @body - productIds
 */
router.delete("/", (req, res) => {
    services
        .deleteProducts(req)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(err.status?? 500).json(err));
});

module.exports = router;
