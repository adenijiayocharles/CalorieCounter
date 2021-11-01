"use strict";
const joi = require("joi");
const status = require("http-status");
const { handleErrorResponse } = require("../../utilities/response");

const validateInvite = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().required().label("First Name"),
        email: joi.string().email().required().label("Email Address"),
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

module.exports = validateInvite;
