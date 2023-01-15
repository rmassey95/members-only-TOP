import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  f_name: { type: String, minLength: 3, trim: true, required: true },
  l_name: { type: String, minLength: 3, trim: true, required: true },
  username: { type: String, minLength: 3, required: true },
  password: { type: String, minLength: 3, trim: true, required: true },
  member: { type: Boolean, required: true, default: false },
});

MessageSchema.virtual("url").get(function () {
  return `/`;
});

MessageSchema.virtual("fullname").get(function () {
  return `${this.f_name} ${this.l_name}`;
});

module.exports = mongoose.model("User", UserSchema);
