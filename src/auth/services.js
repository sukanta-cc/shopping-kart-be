const messages = require("../utils/messages");
const userModel = require("./model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const sendMail = require("../mail-config");
const CryptoJS = require("crypto-js");

function addMinutes(date, minutes) {
    date.setMinutes(date.getMinutes() + minutes);

    return date;
}

function generateOTP() {
    // Generate a random 6-digit number
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString(); // Convert to string to ensure it's always 6 digits
}

module.exports = {
    signup: (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { name, email, phone, password } = req.body;
                // Check user is already in the system or not
                const user = await userModel.findOne({
                    email,
                    isDeleted: false,
                });

                if (!user) {
                    // Encrypt the password
                    const saltRound = 10;
                    const hashPass = bcrypt.hashSync(password, saltRound);

                    // Create a new user
                    const newUser = new userModel({
                        name,
                        email,
                        phone,
                        password: hashPass,
                    });

                    const savedUser = await newUser.save();

                    if (!savedUser) {
                        return reject({
                            status: 400,
                            success: false,
                            message: messages.auth.USER_CREATE_FAILED,
                        });
                    } else {
                        sendMail({
                            to: savedUser.email,
                            subject: "Account Created",
                            message: `Hello <strong style="color: #3F00FF">${savedUser.name}</strong>, your account has been created successfully. Please login to your account using your email id and password.`,
                        });
                        return resolve({
                            success: true,
                            message: messages.auth.USER_CREATED_SUCCESS,
                            data: savedUser,
                        });
                    }
                } else {
                    // Returning error that user is existed
                    return reject({
                        status: 400,
                        success: false,
                        message: messages.auth.USER_EXISTS,
                    });
                }
            } catch (error) {
                console.error(error, "<<-- error in user signup");
                return reject({
                    success: false,
                    message: messages.common.INTERNAL_SERVER_ERROR,
                    err: error.message ?? error.toString(),
                });
            }
        });
    },

    signin: (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { email, password } = req.body;
                // Search for a user using email id or phone number
                const user = await userModel.findOne({ email });

                // If not found then return or check password
                if (!user) {
                    return reject({
                        status: 404,
                        success: false,
                        message: messages.auth.USER_NOT_FOUND,
                    });
                } else {
                    const checkPass = bcrypt.compareSync(
                        password,
                        user.password
                    );

                    // if checkPass true then return success with access_token or return password mismatch
                    if (checkPass) {
                        const token = jwt.sign(
                            { email: user.email, _id: user._id },
                            config.jwtPrivateKey,
                            { expiresIn: "7d" }
                        );

                        if (user.isTwoFAEnabled) {
                            const otp = generateOTP();
                            user.otp = otp;

                            await user.save();

                            sendMail({
                                to: user.email,
                                subject: "Two-Factor Authentication",
                                message: `Hello <strong style="color: #3F00FF">${user.name}</strong>, you have requested to enable two-factor authentication. Use this below otp to Login <br />
                                <p style="
                                font-size: 24px;
                                font-weight: bold;
                                background: #8b79ff;
                                width: fit-content;
                                padding: 5px 10px;
                                border-radius: 8px;
                                color: white;" id="otpDisplay">${otp}</p>
                                `,
                            });

                            return resolve({
                                success: true,
                                message: messages.auth.VERIFY_OTP,
                            });
                        } else {
                            return resolve({
                                success: true,
                                message: messages.auth.USER_LOGGEDIN_SUCCESS,
                                access_token: token,
                            });
                        }
                    } else {
                        return reject({
                            status: 400,
                            success: false,
                            message: messages.auth.PASSWORD_MISMATCH_ERROR,
                        });
                    }
                }
            } catch (error) {
                console.error(error, "<<-- error in user sign in");
                return reject({
                    success: false,
                    message: messages.common.INTERNAL_SERVER_ERROR,
                    err: error.message ?? error.toString(),
                });
            }
        });
    },

    verifyTokenAndLogin: (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { otp } = req.params;

                const user = await userModel.findOne({ otp });

                if (!user) {
                    return reject({
                        status: 404,
                        success: false,
                        message: messages.auth.USER_NOT_FOUND,
                    });
                } else {
                    const token = jwt.sign(
                        { email: user.email, _id: user._id },
                        config.jwtPrivateKey,
                        { expiresIn: "7d" }
                    );

                    user.otp = "";
                    await user.save();

                    return resolve({
                        success: true,
                        message: messages.auth.USER_LOGGEDIN_SUCCESS,
                        access_token: token,
                    });
                }
            } catch (error) {
                console.error(error, "<<-- Error in user sign in");
                return reject({
                    success: false,
                    message: messages.common.INTERNAL_SERVER_ERROR,
                    err: error.message ?? error.toString(),
                });
            }
        });
    },

    resetPassword: (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { email } = req.params;
                // const { password } = req.body;

                const user = await userModel.findOne({
                    email,
                    isDeleted: false,
                });

                if (!user) {
                    return reject({
                        status: 404,
                        success: false,
                        message: messages.auth.USER_NOT_FOUND,
                    });
                } else {
                    // Sending verification email

                    // Sending a encrypted token to verify the user
                    var ciphertext = CryptoJS.AES.encrypt(
                        JSON.stringify({
                            email: user.email,
                            _id: user._id,
                            expiresIn: addMinutes(new Date(), 10),
                        }),
                        config.cipherPrivateKey
                    ).toString();

                    console.log(ciphertext, "<<-- ciphertext");

                    sendMail({
                        to: user.email,
                        subject: "Reset Password",
                        message: `Hello <strong style="color: #3F00FF">${user.name}</strong>, you are receiving this email because you requested to reset your password. Please click on the following link to reset your password: <a href="${config.clientUrl}/reset-password/${ciphertext}">Reset Password</a>`,
                    });

                    await user.save();

                    return resolve({
                        success: true,
                        message: messages.auth.PASSWORD_RESET,
                    });
                }
            } catch (error) {
                console.error(error, "<<-- Error in resetting password");
                return reject({
                    success: false,
                    message: messages.common.INTERNAL_SERVER_ERROR,
                    err: error.message ?? error.toString(),
                });
            }
        });
    },

    verifyTokenAndChangePassword: (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { ciphertext } = req.params;
                const { password } = req.body;

                var bytes = CryptoJS.AES.decrypt(
                    ciphertext,
                    config.cipherPrivateKey
                );
                var originalText = JSON.parse(
                    bytes.toString(CryptoJS.enc.Utf8)
                );

                const user = await userModel.findOne({
                    _id: originalText._id,
                    isDeleted: false,
                });

                if (!user) {
                    return reject({
                        status: 404,
                        success: false,
                        message: messages.auth.USER_NOT_FOUND,
                    });
                } else {
                    const saltRound = 10;
                    const hashPass = bcrypt.hashSync(password, saltRound);

                    user.password = hashPass;

                    await user.save();

                    return resolve({
                        success: true,
                        message: messages.auth.PASSWORD_CHANGED,
                    });
                }
            } catch (error) {
                console.error(
                    error,
                    "<<-- Error in verifyTokenAndChangePassword"
                );
                return reject({
                    success: false,
                    message: messages.common.INTERNAL_SERVER_ERROR,
                    err: error.message ?? error.toString(),
                });
            }
        });
    },

    changeTwoFA: (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { email } = req.user;

                const user = await userModel.findOne({
                    email,
                    isDeleted: false,
                });

                if (!user) {
                    return reject({
                        status: 404,
                        success: false,
                        message: messages.auth.USER_NOT_FOUND,
                    });
                } else {
                    user.isTwoFAEnabled = !user.isTwoFAEnabled;

                    let updatedUser = await user.save();

                    return resolve({
                        success: true,
                        message:
                            messages.auth[
                                updatedUser.isTwoFAEnabled
                                    ? "TWO_FACTOR_ENABLED"
                                    : "TWO_FACTOR_DISABLED"
                            ],
                    });
                }
            } catch (error) {
                console.error(
                    error,
                    "<<-- error in enabling two factor authentication"
                );
                return reject({
                    success: false,
                    message: messages.common.INTERNAL_SERVER_ERROR,
                    err: error.message ?? error.toString(),
                });
            }
        });
    },
};
