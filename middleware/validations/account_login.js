"use strict";
const joi = require("joi");
const status = require("http-status");
const { handleErrorResponse } = require("../../utilities/response");

const validateLogin = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required().label("Email Address"),
        password: joi.string().required().label("Password"),
    });

    const { error } = schema.validate(req.body, {
        abortEarly: false,
        allowUnknown: true,
    });
    const valid = error == null;
    if (valid) {
        next();
    } else {
        const errors = error.details.map((error) => error.message);
        return handleErrorResponse({
            res,
            status_code: status.UNPROCESSABLE_ENTITY,
            body: { errors },
        });
    }
};

module.exports = validateLogin;
