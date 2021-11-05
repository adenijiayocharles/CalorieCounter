"use strict";
const status = require("http-status");
const { Op } = require("sequelize");
const { format, subDays } = require("date-fns");
const Food = require("../models/Food");
const User = require("../models/User");
const {
    handleErrorResponse,
    handleSuccessResponse,
} = require("../utilities/response");
const { dateArray } = require("../utilities/utils");

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
            order: [["created_at", "DESC"]],
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
            order: [["created_at", "DESC"]],
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
            order: [["created_at", "DESC"]],
        });
        if (records.length) {
            let mapped = await Promise.all(
                records.map(async (record) => {
                    const user = await User.findOne({
                        where: { id: record.user_id },
                    });

                    return {
                        id: record.id,
                        user_id: user.id,
                        user_name: user.name,
                        food: record.name,
                        calorie: record.calorie,
                        date_eaten: record.date_eaten,
                        created_at: record.created_at,
                    };
                })
            );

            return handleSuccessResponse({
                res,
                message: "Foods found",
                status_code: status.OK,
                body: { data: mapped },
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

const adminOne = async (req, res, next) => {
    try {
        const records = await Food.findAll({
            where: {
                id: req.params.food_id,
            },
        });

        if (records.length) {
            let mapped = await Promise.all(
                records.map(async (record) => {
                    const user = await User.findOne({
                        where: { id: record.user_id },
                    });

                    return {
                        id: record.id,
                        user_id: user.id,
                        user_name: user.name,
                        food: record.name,
                        calorie: record.calorie,
                        date_eaten: record.date_eaten,
                        created_at: record.created_at,
                    };
                })
            );

            return handleSuccessResponse({
                res,
                message: "Foods found",
                status_code: status.OK,
                body: { data: mapped },
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

const deleteOne = async (req, res, next) => {
    try {
        const record = await Food.destroy({
            where: {
                id: req.params.food_id,
            },
        });

        if (record) {
            return handleSuccessResponse({
                res,
                message: "Food deleted successfully",
                status_code: status.OK,
            });
        } else {
            return handleSuccessResponse({
                res,
                message: "Food not found. Unable to delete food",
                status_code: status.OK,
            });
        }
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const data = req.body;
        const record = await Food.update(data, {
            where: {
                id: req.params.food_id,
            },
        });

        if (record) {
            return handleSuccessResponse({
                res,
                message: "Food updated successfully",
                status_code: status.OK,
            });
        } else {
            return handleSuccessResponse({
                res,
                message: "Food not found. Unable to update food",
                status_code: status.OK,
            });
        }
    } catch (error) {
        next(error);
    }
};

const createAdminFood = async (req, res, next) => {
    try {
        await Food.create({
            name: req.body.name,
            user_id: req.body.user_id,
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

// const caloriesPerUser = async (req, res, next) => {
//     try {
//         const today = format(new Date(), "yyyy-MM-dd");
//         const date = new Date(today);
//         const days = subDays(date, 7);
//         const lastSeven = format(new Date(days), "yyyy-MM-dd");

//         console.log(dateArray(lastSeven, today));

//         const records = await User.findAll({});
//         if (records.length) {
//             let mapped = await Promise.all(
//                 records.map(async (record) => {
//                     const user = await Food.findAll({
//                         where: {
//                             user_id: record.id,
//                             from: {
//                                 $between: [startDate, endDate],
//                             },
//                         },
//                     });

//                     return {
//                         id: record.id,
//                         user_id: user.id,
//                         user_name: user.name,
//                         food: record.name,
//                         calorie: record.calorie,
//                         date_eaten: record.date_eaten,
//                         created_at: record.created_at,
//                     };
//                 })
//             );

//             return handleSuccessResponse({
//                 res,
//                 message: "Foods found",
//                 status_code: status.OK,
//                 body: { data: mapped },
//             });
//         } else {
//             return handleSuccessResponse({
//                 res,
//                 message: "Foods not found",
//                 status_code: status.OK,
//                 body: { data: [] },
//             });
//         }

//         return true;
//         // const last = forma
//     } catch (error) {
//         next(error);
//     }
// };

module.exports = {
    create,
    all,
    one,
    calorieOverflow,
    adminAll,
    adminOne,
    deleteOne,
    update,
    createAdminFood,
    caloriesPerUser,
};
