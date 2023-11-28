const storeModel = require("./model");
const messages = require("../utils/messages");
const fs = require("fs");

module.exports = {
	logoUpload: (req) => {
		return new Promise(async (resolve, reject) => {
			try {
				const newStore = await storeModel.create({
					storeLogo: req.file.path,
				});
				return resolve({
					success: true,
					message: messages.store.LOGO_UPLOADED,
					data: newStore,
				});
			} catch (error) {
				console.error(error, "<<-- Error in adding store details");
				return reject({
					success: false,
					message: messages.common.INTERNAL_SERVER_ERROR,
					err: error.message ?? error.toString(),
				});
			}
		});
	},

	bannerUpload: (req) => {
		return new Promise(async (resolve, reject) => {
			try {
				const newStore = await storeModel.findOneAndUpdate(
					{},
					{
						storeBanner: req.file.path,
					},
					{ new: true }
				);

				return resolve({
					success: true,
					message: messages.store.LOGO_UPLOADED,
					data: newStore,
				});
			} catch (error) {
				console.error(error, "<<-- Error in adding store details");
				return reject({
					success: false,
					message: messages.common.INTERNAL_SERVER_ERROR,
					err: error.message ?? error.toString(),
				});
			}
		});
	},

	getImage: (req, res) => {
		return new Promise(async (resolve, reject) => {
			try {
				const { imageUrl } = req.query;
				const img = fs.readFileSync(imageUrl);

				res.end(img, "binary");
			} catch (error) {
				console.error(error, "<<-- Error in adding store details");
				return reject({
					success: false,
					message: messages.common.INTERNAL_SERVER_ERROR,
					err: error.message ?? error.toString(),
				});
			}
		});
	},
};
