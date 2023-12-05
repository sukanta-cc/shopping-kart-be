const messages = require("../utils/messages");

const adminRouter = async (req, res, next) => {
	try {
		const { role } = req.user;

		if (role !== "admin") {
			return res.status(401).send({
				success: false,
				message: messages.common.UNAUTHORIZED,
			});
		} else {
			next();
		}
	} catch (error) {
		console.error(error, "<<-- Error in admin router verification");
		res.status(500).send({
			success: false,
			message: messages.common.INTERNAL_SERVER_ERROR,
			err: error.message ?? error.toString(),
		});
	}
};

module.exports = adminRouter;
