const { check } = require("express-validator");

const cartValidationRule = [
	check("product").not().isEmpty().withMessage("Product can't be empty"),
	check("quantity")
		.not()
		.isEmpty()
		.withMessage("Quantity cannot be empty")
		.isNumeric()
		.withMessage("Quantity should be number")
		.isInt({ min: 1 })
		.withMessage("Quantity cannot be less than 1"),
];

const orderValidationRule = [
	check("products").not().isEmpty().withMessage("Product can't be empty"),
	check("products.*.productId")
		.isString()
		.withMessage("ProductId must be a string")
		.not()
		.isEmpty()
		.withMessage("ProductId can't be empty"),

	check("products.*.quantity")
		.not()
		.isEmpty()
		.withMessage("Quantity cannot be empty")
		.isNumeric()
		.withMessage("Quantity should be number")
		.isInt({ min: 1 })
		.withMessage("Quantity cannot be less than 1"),

	check("totalPrice")
		.not()
		.isEmpty()
		.withMessage("Total price cannot be empty")
		.isNumeric()
		.withMessage("Total price should be number"),

	// check("status")
	// 	.isIn(["Pending", "Delivered", "Canceled"])
	// 	.withMessage("Status should be either Pending, Delivered or Canceled"),
];

const orderStatusValidationRule = [
	check("status")
		.isIn(["Pending", "Delivered", "Canceled"])
		.withMessage("Status should be either Pending, Delivered or Canceled"),
];

module.exports = {
	cartValidationRule,
	orderValidationRule,
	orderStatusValidationRule,
};
