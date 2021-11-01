"use strict";
require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DEV_DB,
    process.env.DEV_USER,
    process.env.DEV_PASS,
    {
        host: process.env.DEV_HOST,
        dialect: "mysql",
    }
);

module.exports = sequelize;
