const couponModel = require("./model");
const messages = require("../utils/messages");

module.exports = {
	createCoupon: (req) => {
		return new Promise(async (resolve, reject) => {
			try {
				const { code, type, value, expiration_date } = req.body;

				const coupon = new couponModel({
					code,
					type,
					value,
					expiration_date,
				});

				const savedCoupon = await coupon.save();

				if (!savedCoupon) {
					return reject({
						status: 400,
						success: false,
						message: messages.coupon.COUPON_CREATE_FAILED,
					});
				} else {
					return resolve({
						status: 200,
						success: true,
						message: messages.coupon.COUPON_CREATED,
						result: savedCoupon,
					});
				}
			} catch (error) {
				console.error(error, "<<-- Error in create coupon");
				return reject({
					success: false,
					message: messages.common.INTERNAL_SERVER_ERROR,
					err: error.message ?? error.toString(),
				});
			}
		});
	},

	changeCouponStatus: (req) => {
		return new Promise(async (resolve, reject) => {
			try {
				const { code, status } = req.body;

				const coupon = await couponModel.findOneAndUpdate(
					{ code, isDeleted: false },
					{ status },
					{ new: true }
				);

				if (!coupon) {
					return reject({
						status: 400,
						success: false,
						message: messages.coupon.COUPON_STATUS_FAILED.replace(
							"{{status}}",
							!status ? "activation" : "deactivation"
						),
					});
				} else {
					return resolve({
						status: 200,
						success: true,
						message: messages.coupon.COUPON_STATUS_SUCCESS.replace(
							"{{status}}",
							!status ? "activated" : "deactivated"
						),
						result: coupon,
					});
				}
			} catch (error) {
				console.error(error, "<<-- Error in create coupon");
				return reject({
					success: false,
					message: messages.common.INTERNAL_SERVER_ERROR,
					err: error.message ?? error.toString(),
				});
			}
		});
	},

	getAllCoupons: (req) => {
		return new Promise(async (resolve, reject) => {
			try {
				let query = {
					isDeleted: false,
				};

				if (req.query.status) {
					query.status = req.query.status;
				}

				const coupons = await couponModel.find(query);

				if (!coupons) {
					return reject({
						status: 400,
						success: false,
						message: messages.coupon.COUPONS_FETCHED_FAILED,
					});
				} else {
					return resolve({
						status: 200,
						success: true,
						message: messages.coupon.COUPONS_FETCHED_SUCCESS,
						result: coupons,
					});
				}
			} catch (error) {
				console.error(error, "<<-- Error in create coupon");
				return reject({
					success: false,
					message: messages.common.INTERNAL_SERVER_ERROR,
					err: error.message ?? error.toString(),
				});
			}
		});
	},
};
