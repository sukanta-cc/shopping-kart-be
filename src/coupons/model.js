const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const couponSchema = new Schema(
	{
		code: {
			type: String,
			required: true,
			unique: true,
		},
		type: {
			type: String,
			enum: ["percentage", "amount"],
			required: true,
		},
		value: {
			type: Number,
			required: true,
		},
		status: {
			type: Boolean,
			default: true,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
		deletedAt: {
			type: Date,
			default: null,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("coupons", couponSchema);
