const express = require("express");
const services = require("./services");
const { loginValidation, signUpValidation } = require("./validation");
const errorValidate = require("../middlewares/errorValidate");

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
 * @route - /api/auth/reset-password
 * @description - This api is for reset password
 * @body - email
 */
router.post("/reset-password/:email", (req, res) => {
    services
        .resetPassword(req)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(err.status ?? 500).json(err));
});

module.exports = router;
