var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Members Only" });
});

router.get("/sign-up", userController.signUpForm);

router.post("/sign-up", userController.signUpPost);

module.exports = router;
