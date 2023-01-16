const { body, validationResult } = require("express-validator");
const Message = require("../models/Message");

exports.homepageGet = (req, res, next) => {
  Message.find()
    .populate("user")
    .exec((err, allMessages) => {
      if (err) {
        return next(err);
      }
      res.render("index.pug", { title: "Homepage", messages: allMessages });
    });
};

exports.messageFormGet = (req, res, next) => {
  res.render("create_message_form", { title: "Create New Message" });
};

exports.messageFormPost = [
  body("title")
    .isLength({ min: 3 })
    .withMessage("Title must be atleast 3 characters long"),
  body("message")
    .isLength({ min: 3 })
    .withMessage("Message must be atleast 3 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("create_message_form", {
        title: "Create new Message",
        errors: errors.array(),
      });
    }

    const message = new Message({
      title: req.body.title,
      timestamp: Date.now(),
      text: req.body.message,
      user: req.user._id,
    }).save((err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  },
];

exports.deleteMessagePost = (req, res, next) => {
  Message.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }

    res.redirect("/");
  });
};
