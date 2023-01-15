const mongoose = require("mongoose");
const { Schema } = mongoose;

const MessageSchema = new Schema({
  title: { type: String, minLength: 3, trim: true, required: true },
  timestamp: { type: Date, default: Date.now, required: true },
  text: { type: String, minLength: 3, trim: true, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

MessageSchema.virtual("url").get(function () {
  return `/`;
});

module.exports = mongoose.model("Message", MessageSchema);
