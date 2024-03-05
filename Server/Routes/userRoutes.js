const express = require('express');

const { protect } = require("../Controllers/auth");

const router = express.Router();

const userController = require('../Controllers/user');

router.patch("/update-Profile", protect, userController.update);


module.exports = router;