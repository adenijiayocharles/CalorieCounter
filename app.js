"use strict";
require("dotenv").config();
const express = require("express");
const app = express();

// database
const sequelize = require("./database");

// PORT
const PORT = process.env.PORT || 5000;

// express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routers
const accountRouter = require("./routes/account");

app.use("/api/account", accountRouter);

app.listen(PORT, async () => {
    console.log(`Server connnected on port ${PORT}`);
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});
