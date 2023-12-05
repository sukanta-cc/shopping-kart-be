require("dotenv").config();

const config = {
    clientUrl: process.env.CLIENT_URL || "",
    port: process.env.PORT || 4000,
    mongodbUri: process.env.MONGODB_URI || "",
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY || "",
    userEmail: process.env.USER_EMAIL || "",
    userPassword: process.env.USER_PASSWORD || "",
    cipherPrivateKey: process.env.CIPHER_PRIVATE_KEY || "",
};

module.exports = config;
