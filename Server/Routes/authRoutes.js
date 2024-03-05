const express = require('express');

const authControllers = require("../Controllers/auth");

const router = express.Router();

router.post("/login", authControllers.protect, authControllers.login);

router.post("/register", authControllers.protect, authControllers.register);

router.post("/send-otp", authControllers.protect, authControllers.sendOtp);

router.post("/verify-otp", authControllers.verifyOtp);

router.post("/forget-password", authControllers.protect, authControllers.forgetPassword);

router.post("/reset-password", authControllers.protect, authControllers.resetPassword);

module.exports = router;