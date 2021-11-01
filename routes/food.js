"use strict";
const express = require("express");
const router = express.Router();

const createValidation = require("../middleware/validations/food_create");
const foodController = require("../controllers/FoodController");
const verifyUser = require("../middleware/auth");

router.post("/", [createValidation, verifyUser], foodController.create);

module.exports = router;
