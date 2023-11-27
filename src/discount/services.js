const messages = require("../utils/messages");
const discountModel = require("./model");
const productModel = require("../products/model");

module.exports = {
	addDiscount: (req) => {
		return new Promise(async (resolve, reject) => {
			try {
				const { name, description, discount, product, type } = req.body;

				const globalDiscount = await discountModel
					.findOne({
						global: true,
						status: true,
						isDeleted: false,
					})
					.sort({ createdAt: -1 });

				const productDiscount = await discountModel.findOne({
					product: product,
					status: true,
					isDeleted: false,
				});

				console.log(productDiscount, "<<-- productDiscount");

				// If productId is not exists then it will be global discount otherwise it will be product specific discount
				const newDiscount = new discountModel({
					name,
					description,
					discount,
					type,
					global: !product ? true : false,
					product,
				});

				const savedDiscount = await newDiscount.save();

				if (!savedDiscount) {
					return reject({
						status: 400,
						success: false,
						message: messages.discount.DISCOUNT_CREATED_FAILED,
					});
				} else {
					// Adding this discount id to the product table
					if (savedDiscount.product) {
						let query = {
							isDeleted: false,
							_id: savedDiscount.product,
						};

						if (productDiscount?._id) {
							query.discount = productDiscount._id;

							// Changing status of the old global discount
							productDiscount.status = false;

							await productDiscount.save();
						}

						await productModel.updateOne(query, {
							discount: savedDiscount._id,
						});
					} else {
						let query = {
							isDeleted: false,
						};

						if (globalDiscount?._id) {
							query.discount = globalDiscount._id;

							// Changing status of the old global discount
							globalDiscount.status = false;

							await globalDiscount.save();
						}

						await productModel.updateMany(query, {
							discount: savedDiscount._id,
						});
					}

					return resolve({
						status: 200,
						success: true,
						message: messages.discount.DISCOUNT_CREATED_SUCCESS,
						result: savedDiscount,
					});
				}
			} catch (error) {
				console.error(error, "<<-- Error in addDiscount");
				return reject({
					success: false,
					message: messages.common.INTERNAL_SERVER_ERROR,
					err: error.message ?? error.toString(),
				});
			}
		});
	},

	getDiscounts: (req) => {
		return new Promise(async (resolve, reject) => {
			try {
				const discounts = await discountModel
					.find({
						isDeleted: false,
					})
					.sort({ createdAt: -1 });

				return resolve({
					status: 200,
					success: true,
					message: messages.discount.DISCOUNTS_FETCHED_SUCCESS,
					result: discounts,
				});
			} catch (error) {
				console.error(error, "<<-- Error in getDiscounts");
				return reject({
					success: false,
					message: messages.common.INTERNAL_SERVER_ERROR,
					err: error.message ?? error.toString(),
				});
			}
		});
	},

	updateDiscount: (req) => {
		return new Promise(async (resolve, reject) => {
			try {
				const { discountId } = req.params;
				const { name, description, discount, product } = req.body;

				const updatedDiscount = await discountModel.findByIdAndUpdate(
					discountId,
					{
						name,
						description,
						discount,
						product,
					},
					{ new: true }
				);

				return resolve({
					status: 200,
					success: true,
					message: messages.discount.DISCOUNT_UPDATED_SUCCESS,
					result: updatedDiscount,
				});
			} catch (error) {
				console.error(error, "<<-- Error in updateDiscount");
				return reject({
					success: false,
					message: messages.common.INTERNAL_SERVER_ERROR,
					err: error.message ?? error.toString(),
				});
			}
		});
	},

	deleteDiscount: (req) => {
		return new Promise(async (resolve, reject) => {
			try {
				const { discountId } = req.params;

				const deletedDiscount = await discountModel.findByIdAndUpdate(
					discountId,
					{
						isDeleted: true,
						deletedAt: new Date(),
					},
					{ new: true }
				);

				return resolve({
					status: 200,
					success: true,
					message: messages.discount.DISCOUNTS_DELETED_SUCCESS,
					result: deletedDiscount,
				});
			} catch (error) {
				console.error(error, "<<-- Error in deleteDiscount");
				return reject({
					success: false,
					message: messages.common.INTERNAL_SERVER_ERROR,
					err: error.message ?? error.toString(),
				});
			}
		});
	},
};
