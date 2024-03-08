const express = require('express');

const authControllers = require("../Controllers/auth");

const router = express.Router();

router.post("/login", authControllers.protect, authControllers.login);

router.post("/register",  authControllers.register , authControllers.sendOtp);

router.post("/send-otp", authControllers.protect, authControllers.sendOtp);

router.post("/verify-otp", authControllers.protect, authControllers.verifiedOtp);

router.post("/forget-password", authControllers.protect, authControllers.forgetPassword);

router.post("/reset-password", authControllers.protect, authControllers.resetPassword);

module.exports = router;