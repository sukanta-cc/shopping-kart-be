const userModel = require("../auth/model");
const bcrypt = require("bcrypt");

const createAdminUser = async () => {
	try {
		const existingUser = await userModel.findOne({ role: "admin" });

		if (!existingUser) {
			const saltRound = 10;
			const hashPassword = bcrypt.hashSync("Admin@1234#", saltRound);
			const adminUser = new userModel({
				name: "admin",
				email: "admin@gmail.com",
				password: hashPassword,
				role: "admin",
			});
			await adminUser.save();
			console.log("Admin user created");
		}
	} catch (error) {
		console.error(error, "<<-- error in generating admin user");
	}
};

module.exports = createAdminUser;
