"use strict";
const express = require("express");
const router = express.Router();

const createValidation = require("../middleware/validations/food_admin_create");
const foodController = require("../controllers/FoodController");
const verifyUser = require("../middleware/admin");

router.get("/", verifyUser, foodController.adminAll);
router.get("/:food_id", verifyUser, foodController.adminOne);
router.delete("/:food_id", verifyUser, foodController.deleteOne);
router.put("/:food_id", verifyUser, foodController.update);
router.post(
    "/",
    [createValidation, verifyUser],
    foodController.createAdminFood
);

module.exports = router;
