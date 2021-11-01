"use strict";
const express = require("express");
const router = express.Router();
const registrationValidation = require("../middleware/validations/account_registration");
const loginValidation = require("../middleware/validations/account_login");
const inviteValidation = require("../middleware/validations/account_invite");
const accountController = require("../controllers/AccountController");
const verifyUser = require("../middleware/auth");

router.post("/register", registrationValidation, accountController.register);
router.post("/login", loginValidation, accountController.login);
router.post(
    "/invite",
    [inviteValidation, verifyUser],
    accountController.invite
);

module.exports = router;
