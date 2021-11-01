"use strict";
const joi = require("joi");
const status = require("http-status");
const { handleErrorResponse } = require("../../utilities/response");

const validateFoodCreation = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().required().label("Food Name"),
        calorie: joi.number().required().label("Calorie"),
        date_eaten: joi.string().required().label("Date Eaten"),
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

module.exports = validateFoodCreation;
