'use strict';
const crypto = require('crypto');

/** generates a random number of specified length */
const randomNumber = (length = 6) => {
    return crypto
        .randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length)
        .toUpperCase();
};

module.exports = {
    randomNumber,
};
