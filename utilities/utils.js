"use strict";
const crypto = require("crypto");
const moment = require("moment");
/** generates a random number of specified length */
const randomNumber = (length = 6) => {
    return crypto
        .randomBytes(Math.ceil(length / 2))
        .toString("hex")
        .slice(0, length)
        .toUpperCase();
};

const dateArray = (startDate, stopDate) => {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
        dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
        currentDate = moment(currentDate).add(1, "days");
    }
    return dateArray;
};

module.exports = {
    randomNumber,
    dateArray,
};
