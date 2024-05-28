const express = require('express');

const { protect } = require("../Controllers/auth");

const router = express.Router();

const userController = require('../Controllers/user');
const authController = require("../Controllers/auth");



router.post("/generate-zego-token", protect, userController.generateZegoToken);

router.get("/get-profile", protect, userController.getMe);

router.patch("/update-profile", protect, userController.update);

router.get("/get-users", protect, userController.getUsers);

router.get("/get-friends", protect, userController.getFriends);

router.get("/get-friend-requests", protect, userController.getRequests);


// for audio call


router.get("/get-callLogs", protect, userController.getCallLogs);

router.post("/start-audio-call", protect, userController.startAudioCall);


module.exports = router;