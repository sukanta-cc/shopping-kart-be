const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const discountSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
		},
		discount: {
			type: Number,
			required: true,
		},
		type: {
			type: String,
			enum: ["percentage", "amount"],
			required: true,
		},
		global: {
			type: Boolean,
			default: true,
		},
		product: {
			type: Schema.Types.ObjectId,
			ref: "products",
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

module.exports = mongoose.model("discounts", discountSchema);
