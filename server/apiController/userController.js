import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import Token from "../utils/webtoken.js";
import cloudinary from "cloudinary";
import { getDataUri } from "../utils/dataUri.js";

// register user
export const register = async (req, res, next) => {
  try{const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    return next(new Error("Please enter all the fields"));
  }
  const user = await User.findOne({ email });
  if (user) {
    res.status(400);
    return next(new Error("user alreday exist with this email"));
  }

  const hashedPass = await bcrypt.hash(password, 10);
  const file = req.file;
  const fileUri = getDataUri(file);
  const result = await cloudinary.v2.uploader.upload(fileUri.content);
  const newUser = await User.create({
    name,
    email,
    password: hashedPass,
    avatar: result.secure_url,
  });

  const token = Token(newUser);
  res.header("auth-token", token).status(200).json({
    success: true,
    msg: "user registered successfully",
    newUser,
    token,
  });}catch(err){
    console.log(err);
  }
};

//login
export const login = async (req, res, next) => {
  try{const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    return next(new Error("Please enter all the fields"));
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    return next(new Error("Please enter the valid credentials"));
  }
  const isMatched = await bcrypt.compare(password, user.password);
  if (isMatched) {
    const token = Token(user);
    res.status(200).header("auth-token", token).json({
      success: true,
      msg: "user logged in successfully",
      user,
      token,
    });
  } else {
    return next(new Error("Please enter the valid credentials"));
  }}catch(err){
    return next(new Error("Please enter the valid credentials"));
  }
};

// search user
export const searchUser = async (req, res) => {
  const keyword = req.query.search
    ? { name: { $regex: req.query.search, $options: "i" } }
    : {};
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.status(200).json({ success: true, users });
};

