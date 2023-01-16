var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const messageController = require("../controllers/messageController");

/* GET home page. */
router.get("/", messageController.homepageGet);

router.get("/sign-up", userController.signUpForm);

router.post("/sign-up", userController.signUpPost);

router.get("/join-the-club", userController.joinClubGet);

router.post("/join-the-club", userController.joinClubPost);

router.get("/login", userController.loginGet);

router.post("/login", userController.loginPost);

router.post("/logout", userController.logoutPost);

router.get("/create-message", messageController.messageFormGet);

router.post("/create-message", messageController.messageFormPost);

router.post("/delete-message/:id", messageController.deleteMessagePost);

module.exports = router;
