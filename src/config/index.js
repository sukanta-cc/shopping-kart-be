require("dotenv").config();

const config = {
	port: process.env.PORT || 4000,
	mongodbUri: process.env.MONGODB_URI || "",
	jwtPrivateKey: process.env.JWT_PRIVATE_KEY || "",
};

module.exports = config;
