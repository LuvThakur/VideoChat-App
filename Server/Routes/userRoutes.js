const express = require('express');

const { protect } = require("../Controllers/auth");

const router = express.Router();

const userController = require('../Controllers/user');

router.patch("/update-profile", protect, userController.update);

router.get("/get-users", protect, userController.getUsers);

router.get("/get-friends", protect, userController.getFriends);

router.get("/get-friend-requests", protect, userController.getRequests);



module.exports = router;