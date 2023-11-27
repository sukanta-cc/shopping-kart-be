const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const storeSchema = new Schema(
	{
		name: {
			type: String,
		},
		address: {
			type: String,
		},
		storeLogo: {
			type: String,
		},
		storeBanner: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("store", storeSchema);
