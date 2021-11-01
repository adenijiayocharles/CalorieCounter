"use strict";
const Sequelize = require("sequelize");
const db = require("../database");
const User = db.define(
    "foods",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: Sequelize.INTEGER,
        name: Sequelize.STRING,
        date_eaten: Sequelize.DATE,
        calorie: Sequelize.INTEGER,
        role: Sequelize.STRING,
        created_at: Sequelize.DATE,
    },
    {
        freezeTableName: true,
        tableName: "foods",
        timestamps: false,
    }
);

module.exports = User;
