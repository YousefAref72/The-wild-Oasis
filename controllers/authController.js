import { configDotenv } from "dotenv";
import { getUserByEmail, signUpDb } from "../database/userDatabase.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
configDotenv(".env");
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

const sendToken = (user, res) => {
  const token = signToken(user.user_id);

  const cookiesOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie("jwt", token, cookiesOptions);
  res.status(200).json({
    status: "successful",
    data: user,
  });
};

const signUp = catchAsync(async (req, res, next) => {
  const { full_name, email, password, password_confirm } = req.body;
  if (!full_name || !email || !password || !password_confirm)
    return next(new AppError("Missing data", 401));

  if (password !== password_confirm) {
    return next(new AppError("password and password confirm must match", 401));
  }

  const encryptedPassword = await bcrypt.hash(password, 10);
  const attributes = [full_name, email, encryptedPassword, encryptedPassword];
  const newUser = await signUpDb(attributes);
  delete newUser.password;
  delete newUser.password_confirm;
  console.log(newUser);
  if (newUser.severity === "ERROR") {
    return next(new AppError("couldn't Create this user", 400));
  }
  sendToken(newUser, res);
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Missing data", 401));
  }
  const user = await getUserByEmail(email);
  console.log(user);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Incorrect Email or password", 401));
  }
  delete user.password;
  delete user.password_confirm;
  sendToken(user, res);
});
export { signUp, login };
