const userModel = require("../auth/model");
const messages = require("../utils/messages");

module.exports = {
	getAllUsers: (req) => {
		return new Promise(async (resolve, reject) => {
			try {
				const { status, search } = req.query;

				const query = {
					isDeleted: false,
					role: "user",
				};

				if (status) {
					query.status = status;
				}
				if (search) {
					query["$or"] = [
						{ name: { $regex: search, $options: "i" } },
						{ email: { $regex: search, $options: "i" } },
					];
				}

				const users = await userModel.find(query);

				if (users.length > 0) {
					return resolve({
						success: true,
						message: messages.auth.USERS_FOUND_SUCCESSFUL,
						users,
					});
				} else {
					return resolve({
						success: true,
						message: messages.auth.NO_USERS_FOUND,
						users: [],
					});
				}
			} catch (error) {
				console.error(error, "<<-- Error in getting all users");
				return reject({
					success: false,
					message: messages.common.INTERNAL_SERVER_ERROR,
					err: error.message ?? error.toString(),
				});
			}
		});
	},

	getUserDetails: (req) => {
		return new Promise(async (resolve, reject) => {
			try {
				const { userId } = req.params;
				const user = await userModel.findOne({
					_id: userId,
					isDeleted: false,
				});

				if (!user) {
					return reject({
						status: 404,
						success: false,
						message: messages.auth.USER_NOT_FOUND,
					});
				} else {
					return resolve({
						success: true,
						message: messages.auth.USER_FOUND_SUCCESSFUL,
						result: user,
					});
				}
			} catch (error) {
				console.error(error, "<<-- Error in getting user details");
				return reject({
					success: false,
					message: messages.common.INTERNAL_SERVER_ERROR,
					err: error.message ?? error.toString(),
				});
			}
		});
	},

	updateUserStatus: (req) => {
		return new Promise(async (resolve, reject) => {
			try {
				const { userId } = req.params;

				const user = await userModel.findOne({
					_id: userId,
					isDeleted: false,
				});

				if (!user) {
					return reject({
						status: 404,
						success: false,
						message: messages.auth.USER_NOT_FOUND,
					});
				} else {
					user.status = !user.status;

					await user.save();

					return resolve({
						success: true,
						message: messages.auth.USER_ACTIVATION.replace(
							"{{status}}",
							user.status ? "activated" : "deactivated"
						),
					});
				}
			} catch (error) {
				console.error(error, "<<-- Error in updating user status");
				return reject({
					success: false,
					message: messages.common.INTERNAL_SERVER_ERROR,
					err: error.message ?? error.toString(),
				});
			}
		});
	},
};
