const express = require('express');

const authControllers = require("../Controllers/auth");

const router = express.Router();

router.post("/login", authControllers.login);

router.post("/register", authControllers.register, authControllers.sendOtp);

router.post("/send-otp", authControllers.sendOtp);

router.post("/verify-otp", authControllers.verifiedOtp);

router.post("/forget-password", authControllers.forgetPassword);

router.post("/reset-password", authControllers.resetPassword);

module.exports = router;