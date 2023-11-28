const mongoose = require("mongoose");
const generateOrderId = require("../../utils/generateOrderId");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
	products: [
		{
			productId: {
				type: Schema.Types.ObjectId,
				ref: "products",
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
			},
		},
	],
	orderId: {
		type: String,
		default: generateOrderId(6),
	},
	totalPrice: {
		type: Number,
		required: true,
	},
	customer: {
		type: Schema.Types.ObjectId,
		ref: "users",
		required: true,
	},
	coupon: {
		type: Schema.Types.ObjectId,
		ref: "coupons",
	},
	cancelMessage: {
		type: String,
	},
	status: {
		type: String,
		required: true,
		enum: ["Pending", "Delivered", "Canceled"],
		default: "Pending",
	},
});

orderSchema.pre("save", async function (next) {
	await this.populate("products.productId", [
		"_id",
		"name",
		"description",
		"discount",
		"images",
		"amount",
	]);
	next();
});

orderSchema.pre("find", function (next) {
	this.populate("products.productId", [
		"_id",
		"name",
		"description",
		"discount",
		"images",
		"amount",
	]);
	next();
});

orderSchema.pre("findOne", function (next) {
	this.populate("products.productId", [
		"_id",
		"name",
		"description",
		"discount",
		"images",
		"amount",
	]);
	next();
});

module.exports = mongoose.model("orders", orderSchema);
