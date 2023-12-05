const { check } = require("express-validator");

const isValidPhoneNumber = (value) => {
    const phoneRegex = /^\d{10}$/; // This example assumes a 10-digit phone number

    return phoneRegex.test(value);
};

const signUpValidation = [
    check("name")
        .not()
        .isEmpty()
        .withMessage("Name cannot be empty")
        .isString()
        .withMessage("Name must be of type string"),

    check("email")
        .not()
        .isEmpty()
        .withMessage("Email cannot empty")
        .isEmail()
        .withMessage("Email must be a valid email address"),

    check("phone")
        .not()
        .isEmpty()
        .withMessage("Phone number cannot be empty")
        .custom((value) => isValidPhoneNumber(value))
        .withMessage("Invalid phone number"),

    check("password")
        .not()
        .isEmpty()
        .withMessage("Password cannot empty")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];

const loginValidation = [
    check("email")
        .not()
        .isEmpty()
        .withMessage("Email cannot empty")
        .isEmail()
        .withMessage("Email must be a valid email address"),

    check("password")
        .not()
        .isEmpty()
        .withMessage("Password cannot empty")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];

module.exports = { signUpValidation, loginValidation };
