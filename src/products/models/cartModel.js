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
		quantity: {
			type: Number,
			required: true,
			min: 1,
		},
	},
	{
		timestamps: true,
	}
);

cartSchema.pre("save", async function (next) {
	await this.populate("product", [
		"_id",
		"name",
		"description",
		"discount",
		"images",
		"amount",
	]);
	next();
});

cartSchema.pre("find", function (next) {
	this.populate("product", [
		"_id",
		"name",
		"description",
		"discount",
		"images",
		"amount",
	]);
	next();
});

cartSchema.pre("findOne", function (next) {
	this.populate("product", [
		"_id",
		"name",
		"description",
		"discount",
		"images",
		"amount",
	]);
	next();
});

module.exports = mongoose.model("carts", cartSchema);
