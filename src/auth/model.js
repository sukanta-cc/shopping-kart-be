const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        address: {
            type: String,
        },
        password: {
            type: String,
        },
        status: {
            // This field will be use for user activated or deactivated
            type: Boolean,
            default: true,
        },
        isTwoFAEnabled: {
            type: Boolean,
            default: false,
        },
        otp: {
            type: String,
            default: null,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("users", userSchema);
