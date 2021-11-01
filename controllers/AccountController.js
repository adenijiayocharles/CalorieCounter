"use strict";
const bcryptjs = require("bcryptjs");
const status = require("http-status");
const User = require("../models/User");
const {
    handleErrorResponse,
    handleSuccessResponse,
} = require("../utilities/response");
const { generateToken } = require("../utilities/tokenizer");
const { randomNumber } = require("../utilities/utils");

/** creates a new user acccount */
const register = async (req, res, next) => {
    try {
        //check if account already exists
        const doesUserExist = await User.findOne({
            where: { email: req.body.email },
        });

        if (doesUserExist) {
            handleErrorResponse({
                res,
                message: "User already exists",
                status_code: status.CONFLICT,
            });
        }

        // create user
        const password = await bcryptjs.hashSync(req.body.password, 10);
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: password,
            role: req.body.role,
        });
        const userDetails = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
        const token = generateToken(userDetails);
        handleSuccessResponse({
            res,
            message: "Account created successfully",
            body: { token: `Bearer ${token}` },
            status_code: status.CREATED,
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        //check if account already exists
        const user = await User.findOne({
            where: { email: req.body.email },
        });

        if (!user) {
            handleErrorResponse({
                res,
                message: "Unable to login. Invalid email or password",
                status_code: status.NOT_FOUND,
            });
        }

        //compare passwords
        const validPassword = await bcryptjs.compare(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            handleErrorResponse({
                res,
                status_code: status.NOT_FOUND,
                message: "Unable to login. Invalid email or password",
            });
        }
        const userDetails = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
        const token = generateToken(userDetails);
        return handleSuccessResponse({
            res,
            message: "Login successful",
            body: { token: `Bearer ${token}` },
        });
    } catch (error) {
        next(error);
    }
};

const forgotPassword = async (req, res, next) => {};

const resetPassword = async (req, res, next) => {};

module.exports = { register, login, forgotPassword, resetPassword };
