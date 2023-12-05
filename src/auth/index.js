const express = require("express");
const services = require("./services");
const { loginValidation, signUpValidation } = require("./validation");
const errorValidate = require("../middlewares/errorValidate");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

/**
 * @route - /api/auth/signup
 * @description - This api is for signing up for a new user
 * @body - {name, email, phone, address, password}
 */
router.post("/signup", signUpValidation, errorValidate, (req, res) => {
    services
        .signup(req)
        .then((result) => res.status(201).send(result))
        .catch((err) => res.status(err.status ?? 500).send(err));
});

/**
 * @route - /api/auth/login
 * @description - This api is for signing in for users
 * @body - {email, phone, password}
 */
router.post("/login", loginValidation, errorValidate, (req, res) => {
    services
        .signin(req)
        .then((result) => res.status(200).send(result))
        .catch((err) => res.status(err.status ?? 500).send(err));
});

/**
 * @route - /api/auth/verify/:token
 * @description - This api is for verifying the token
 * @params {string} token
 */
router.patch("/verify/:token", verifyToken, (req, res) => {
    services
        .verifyTokenAndLogin(req)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(err.status ?? 500).json(err));
});

/**
 * @route - /api/auth/reset-password/:email
 * @description - This api is for sending email verification
 * @params {string} email
 */
router.post("/reset-password/:email", (req, res) => {
    services
        .resetPassword(req)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(err.status ?? 500).json(err));
});

/**
 * @route - VerifyToken and reset the password
 * @description - Verify the token and reset the password
 * @param {string} token - The token will be verified and resetting the password
 */
router.post("/verify/:ciphertext", (req, res) => {
    services
        .verifyTokenAndChangePassword(req)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(err.status ?? 500).json(err));
});

/**
 * @route - /api/auth/changeTwoFA
 * @description - Api to change two-factor authentication
 */
router.patch("/changeTwoFA", verifyToken, (req, res) => {
    services
        .changeTwoFA(req)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(err.status ?? 500).json(err));
});

module.exports = router;
