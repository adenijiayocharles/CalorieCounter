"use strict";
const Sequelize = require("sequelize");
const db = require("../database");
const User = db.define(
    "users",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: Sequelize.STRING,
        email: {
            type: Sequelize.STRING,
            unique: true,
        },
        password: Sequelize.STRING,
        role: Sequelize.STRING,
        token: Sequelize.STRING,
        created_at: Sequelize.DATE,
    },
    {
        freezeTableName: true,
        tableName: "users",
        timestamps: false,
    }
);

module.exports = User;
