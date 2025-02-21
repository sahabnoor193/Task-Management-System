import mongoose from "mongoose";
import bcrypt from "bcrypt";

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// }, { timestamps: true });

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "" },
    bio: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    discord: { type: String, default: "" },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

export default User;
