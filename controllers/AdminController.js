"use strict";
const status = require("http-status");
const { Op } = require("sequelize");
const Food = require("../models/Food");
const User = require("../models/User");
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

const calorieOverflow = async (req, res, next) => {
    try {
        const limit = req.query.limit || 2100;
        const records = await Food.findAll({
            where: {
                user_id: req.user_details.data.id,
                calorie: {
                    [Op.gte]: limit,
                },
            },
        });

        if (records.length) {
            return handleSuccessResponse({
                res,
                message: "Food over the calorie limit found",
                status_code: status.OK,
                body: { data: records },
            });
        } else {
            return handleSuccessResponse({
                res,
                message: "No food over the calorie limit found",
                status_code: status.OK,
                body: { data: [] },
            });
        }
    } catch (error) {
        next(error);
    }
};

const adminAll = async (req, res, next) => {
    try {
        const records = await Food.findAll({
            order: [["id", "DESC"]],
        });
        if (records.length) {
            let mapped = await Promise.all(
                records.map(async (record) => {
                    const post = await User.findAll({
                        where: { id: record.user_id },
                    });


                    return {
                        id: record.messages_id,
                        message: record.message,
                        post_details: {
                            title: post[0].title,
                            user: user[0].name,
                        },
                    };
                })
            );

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

module.exports = { create, all, one, calorieOverflow, adminAll };
