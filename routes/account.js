"use strict";
const express = require("express");
const router = express.Router();
const registrationValidation = require("../middleware/validations/account_registration");
const loginValidation = require("../middleware/validations/account_login");
const accountController = require("../controllers/AccountController");

router.post("/register", registrationValidation, accountController.register);
router.post("/login", loginValidation, accountController.login);

module.exports = router;
