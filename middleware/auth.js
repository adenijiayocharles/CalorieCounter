"use strict";
const status = require("http-status");
const { verifyToken } = require("../utilities/tokenizer");
const { handleErrorResponse } = require("../utilities/response");
const User = require("../models/User");

const verifyUser = async (req, res, next) => {
    let token = req.header("Authorization");
    if (!token) {
        return handleErrorResponse({
            res,
            message: "Authorization token not found",
            status_code: status.UNAUTHORIZED,
            body: { status: "error" },
        });
    }

    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    } else {
        return handleErrorResponse({
            res,
            message: "Authorization token not found. Add Bearer to token",
            status_code: status.UNAUTHORIZED,
            body: { status: "error" },
        });
    }

    try {
        const verified = verifyToken(token);
        req.user_details = verified;

        // search if user exists
        const user = await User.findOne({
            where: { email: req.user_details.data.email },
        });

        if (!user) {
            return handleErrorResponse({
                res,
                message: "Invalid user account. User not found",
                status_code: status.NOT_FOUND,
            });
        }

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = verifyUser;
