import { generateToken } from "../lib/utils.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password, profilePic } = req.body;

  try {
    if (!password || !email || !fullName) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must contain at least 8 characters" });
    }
    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ message: "Email is already exists" });
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      // generate jwt
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    generateToken(user._id, res);
  } catch (error) {
    res.status(500).json({
      message: `error due to ${error.message}`,
    });
    console.error(error.message);
  }
};

export const logout = async (req, res) => {
  res.json({ message: "logout" });
};
