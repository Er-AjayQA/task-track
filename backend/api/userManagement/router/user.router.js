// ***************** Imports ***************** //
const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

// ***************** Routes ***************** //
router.post("/sign-up", userController.checkUsernameAvailability);
router.post("/sign-up", userController.userSignup);

// ***************** Exports ***************** //
module.exports = router;
