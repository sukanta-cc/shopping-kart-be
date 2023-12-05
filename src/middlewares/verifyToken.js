const jwt = require("jsonwebtoken");
const config = require("../config");
const userModel = require("../auth/model");

const verifyToken = (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        if (!req.headers.authorization) {
            return res.status(404).json({
                status: false,
                message: "You are unauthorized to access this page",
            });
        } else {
            try {
                const decoded = jwt.verify(
                    req.headers.authorization,
                    config.jwtPrivateKey
                );

                if (!decoded) {
                    return res.status(401).json({
                        status: false,
                        message: "Invalid token",
                    });
                } else {
                    const user = await userModel.findOne({
                        _id: decoded._id,
                        isDeleted: false,
                    });

                    console.log(user, "<<-- user");

                    if (user._id) {
                        req.user = user;
                    } else {
                        return res.status(404).json({
                            success: false,
                            message: "User not found",
                        });
                    }
                }

                next();
            } catch (error) {
                console.error(error, "<<-- Error in verifying token");
                return res.status(400).send({
                    success: false,
                    message: "Internal server error",
                    err: error.message ?? error.toString(),
                });
            }
        }
    });
};

module.exports = verifyToken;
