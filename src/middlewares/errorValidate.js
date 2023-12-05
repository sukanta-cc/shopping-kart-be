const { validationResult } = require("express-validator");
const messages = require("../utils/messages");

const errorValidate = (req, res, next) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(422).json({
                status: 422,
                success: false,
                message: result.array()[0],
            });
        }
        next();
    } catch (error) {
        res.status(500).send({
            status: 500,
            success: false,
            message: messages.common.INTERNAL_SERVER_ERROR,
        });
    }
};

module.exports = errorValidate;
