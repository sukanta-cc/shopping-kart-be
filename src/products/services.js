const productsModel = require("./models/model");
const discountModel = require("../discount/model");
const messages = require("../utils/messages");

module.exports = {
	addProduct: (req) => {
		return new Promise(async (resolve, reject) => {
			try {
				const { name, description, productCode, featured, amount } =
					req.body;

				const globalDiscount = await discountModel.findOne({
					global: true,
					status: true,
				});

				const newProduct = new productsModel({
					name,
					description,
					productCode,
					featured,
					amount,
					discount: globalDiscount?._id,
				});

				const product = await newProduct.save();

				return resolve({
					success: true,
					message: messages.products.PRODUCT_CREATED_SUCCESS,
					result: product,
				});
			} catch (error) {
				console.error(error, "<<-- Error in add product");
				return reject({
					success: false,
					message: messages.common.INTERNAL_SERVER_ERROR,
					err: error.message ?? error.toString(),
				});
			}
		});
	},

	updateProduct: (req) => {
		return new Promise(async (resolve, reject) => {
			try {
				const { productId } = req.params;
				const { name, description, productCode, featured } = req.body;
				const product = await productsModel.findByIdAndUpdate(
					productId,
					{
						name,
						description,
						productCode,
						featured,
					},
					{ new: true }
				);

				return resolve({
					success: true,
					message: messages.products.PRODUCT_UPDATED_SUCCESS,
					result: product,
				});
			} catch (error) {
				console.error(error, "<<-- Error in update product");
				return reject({
					success: false,
					message: messages.common.INTERNAL_SERVER_ERROR,
					err: error.message ?? error.toString(),
				});
			}
		});
	},

	changeProductStatus: (req) => {
		return new Promise(async (resolve, reject) => {
			try {
				const { productId } = req.params;
				const product = await productsModel.findByIdAndUpdate(
					productId,
					{
						status: req.body.status,
					},
					{ new: true }
				);

				return resolve({
					success: true,
					message: messages.products.PRODUCT_UPDATED_SUCCESS,
					result: product,
				});
			} catch (error) {
				console.error(error, "<<-- Error in update product");
				return reject({
					success: false,
					message: messages.common.INTERNAL_SERVER_ERROR,
					err: error.message ?? error.toString(),
				});
			}
		});
	},

	getProducts: (req) => {
		return new Promise(async (resolve, reject) => {
			try {
				let query = {
					isDeleted: false,
				};

				if (req.query.status) {
					query.status = req.query.status;
				}
				if (req.query.search) {
					query["$or"] = [
						{ name: { $regex: req.query.search, $options: "i" } },
						{
							productCode: {
								$regex: req.query.search,
								$options: "i",
							},
						},
					];
				}

				const products = await productsModel
					.find(query)
					.sort({ createdAt: -1 });

				return resolve({
					success: true,
					message: messages.products.PRODUCTS_FETCHED_SUCCESS,
					result: products,
				});
			} catch (error) {
				console.error(error, "<<-- Error in get products");
				return reject({
					success: false,
					message: messages.common.INTERNAL_SERVER_ERROR,
					err: error.message ?? error.toString(),
				});
			}
		});
	},

	getProductDetails: (req) => {
		return new Promise(async (resolve, reject) => {
			try {
				const { productId } = req.params;
				const product = await productsModel.findOne({
					_id: productId,
					isDeleted: false,
				});
				return resolve({
					success: true,
					message: messages.products.PRODUCT_FOUND_SUCCESSFUL,
					result: product,
				});
			} catch (error) {
				console.error(error, "<<-- Error in get product details");
				return reject({
					success: false,
					message: messages.common.INTERNAL_SERVER_ERROR,
					err: error.message ?? error.toString(),
				});
			}
		});
	},

	getFeaturedProducts: (req) => {
		return new Promise(async (resolve, reject) => {
			try {
				let query = {
					featured: true,
					isDeleted: false,
				};

				if (req.query.status) {
					query.status = req.query.status;
				}
				if (req.query.search) {
					query["$or"] = [
						{ name: { $regex: req.query.search, $options: "i" } },
						{
							productCode: {
								$regex: req.query.search,
								$options: "i",
							},
						},
					];
				}

				const products = await productsModel.find(query);
				return resolve({
					success: true,
					message:
						messages.products.FEATURED_PRODUCTS_FETCHED_SUCCESS,
					result: products,
				});
			} catch (error) {
				console.error(error, "<<-- Error in get featured products");
				return reject({
					success: false,
					message: messages.common.INTERNAL_SERVER_ERROR,
					err: error.message ?? error.toString(),
				});
			}
		});
	},

	deleteProducts: (req) => {
		return new Promise(async (resolve, reject) => {
			try {
				const { productIds } = req.body;
				await productsModel.updateMany(
					{ _id: { $in: productIds } },
					{ isDeleted: true, deletedAt: new Date() }
				);
				return resolve({
					success: true,
					message: messages.products.PRODUCTS_DELETED_SUCCESS,
				});
			} catch (error) {
				console.error(error, "<<-- Error in delete products");
				return reject({
					success: false,
					message: messages.common.INTERNAL_SERVER_ERROR,
					err: error.message ?? error.toString(),
				});
			}
		});
	},
};
