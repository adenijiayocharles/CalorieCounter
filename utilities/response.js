'use strict';
const status = require('http-status');

/**
 * Method for successful operations - requires an object of the response object, http status code, status message and response code
 */
const handleSuccessResponse = ({
    res,
    status_code = status.OK,
    message = 'Operation successful',
    body = {},
}) => {
    return res
        .status(status_code)
        .json({ status: 'success', message, ...body });
};

/**
 * Method for failed operations - requires an object of the response object, http status code, status message and response code
 */
const handleErrorResponse = ({
    res,
    status_code = status.BAD_REQUEST,
    message = 'Operation failed',
    body = {},
}) => {
    return res.status(status_code).json({ status: 'error', message, ...body });
};

/**
 * Method for fatal operations - requires an Object of the response object, http status code, status message and response code
 */
const handleFatalError = ({
    res,
    status_code = status.INTERNAL_SERVER_ERROR,
    message = 'Oops, something went wrong',
    body = { status: 'error' },
    error,
    stack,
}) => {
    return res
        .status(status_code)
        .send({ status: 'error', message, ...body, error, stack });
};
module.exports = {
    handleSuccessResponse,
    handleErrorResponse,
    handleFatalError,
};
