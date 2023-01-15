const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

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
      }).save((err) => {
        if (err) {
          return next(err);
        }
        return res.redirect("/");
      });
    });
  },
];
