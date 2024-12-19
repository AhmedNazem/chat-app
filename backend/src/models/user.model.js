import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "this field is required :D "],
      unique: true,
    },
    fullName: {
      type: String,
      required: [true, "this field is required too :D"],
    },
    password: {
      type: String,
      required: [true, "this field is required"],
      minlength: 8,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
