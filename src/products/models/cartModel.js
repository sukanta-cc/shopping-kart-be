const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "users",
			required: true,
		},
		product: {
			type: Schema.Types.ObjectId,
			ref: "products",
			required: true,
		},
		totalAmount: {
			type: Number,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		coupon: {
			type: Schema.Types.ObjectId,
			ref: "coupons",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("carts", cartSchema);
