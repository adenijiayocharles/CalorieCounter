"use strict";
const status = require("http-status");
const Food = require("../models/Food");
const {
    handleErrorResponse,
    handleSuccessResponse,
} = require("../utilities/response");

/** creates a new user acccount */
const create = async (req, res, next) => {
    try {
        await Food.create({
            name: req.body.name,
            user_id: req.user_details.data.id,
            date_eaten: req.body.date_eaten,
            calorie: req.body.calorie,
        });
        handleSuccessResponse({
            res,
            message: "Food added successfully",
            status_code: status.CREATED,
        });
    } catch (error) {
        next(error);
    }
};

const all = async (req, res, next) => {
    try {
        const records = await Food.findAll({
            where: {
                user_id: req.user_details.data.id,
            },
            order: [["id", "DESC"]],
        });
        if (records.length) {
            return handleSuccessResponse({
                res,
                message: "Foods found",
                status_code: status.OK,
                body: { data: records },
            });
        } else {
            return handleSuccessResponse({
                res,
                message: "Foods not found",
                status_code: status.OK,
                body: { data: [] },
            });
        }
    } catch (error) {
        next(error);
    }
};

const one = async (req, res, next) => {
    try {
        const records = await Food.findAll({
            where: {
                id: req.params.food_id,
                user_id: req.user_details.data.id,
            },
        });

        if (records.length) {
            return handleSuccessResponse({
                res,
                message: "Food found",
                status_code: status.OK,
                body: { data: records },
            });
        } else {
            return handleSuccessResponse({
                res,
                message: "Food not found",
                status_code: status.OK,
                body: { data: [] },
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { create, all, one };
