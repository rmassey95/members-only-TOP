const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.signUpForm = (req, res, next) => {
  res.render("sign_up_form", { title: "Register" });
};

exports.signUpPost = [
  body("email").isEmail().withMessage("Must be an email"),
  body("fname")
    .isAlpha()
    .withMessage("First name must only include letters")
    .isLength({ min: 3 })
    .withMessage("First name must be atleast 3 characters long"),
  body("lname")
    .isAlpha()
    .withMessage("Last name must only include letters")
    .isLength({ min: 3 })
    .withMessage("Last name must be atleast 3 characters long"),
  body("password")
    .isStrongPassword()
    .withMessage(
      "Not a strong password (require: 1 capital letter, 1 lowercase, 1 symbol, 1 number, and minimum of 8 characters)"
    ),
  body("confPassword")
    .exists()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("sign_up_form", {
        title: "Register",
        errors: errors.array(),
      });
    }

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      const user = new User({
        f_name: req.body.fname,
        l_name: req.body.lname,
        email: req.body.email,
        password: hashedPassword,
        member: false,
        isAdmin: req.body.checkAdmin == "on" ? true : false,
      }).save((err) => {
        if (err) {
          return next(err);
        }
        return res.redirect("/");
      });
    });
  },
];

exports.joinClubGet = (req, res, next) => {
  res.render("join_club_page", { title: "Join The Club" });
};

exports.joinClubPost = (req, res, next) => {
  if (req.body.passcode === "Passcode") {
    User.find({ email: req.user.email }).exec((err, userResult) => {
      if (err) {
        return next(err);
      }

      User.updateOne(
        { email: req.user.email },
        { $set: { member: true } },
        (err, updatedUser) => {
          if (err) {
            return next(err);
          }
          res.redirect("/");
        }
      );
    });
  }
};

exports.loginGet = (req, res, next) => {
  res.render("login_form", { title: "Login" });
};

exports.loginPost = [
  passport.authenticate("local", {
    failureRedirect: "/store/login",
    failureMessage: true,
  }),
  (req, res, next) => {
    res.redirect("/");
  },
];

exports.logoutPost = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
