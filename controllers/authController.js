import { configDotenv } from "dotenv";
import {
  getUserByEmail,
  getUserById,
  signUpDb,
  updatePassword as updatePasswordDb,
  updateUser,
} from "../database/userDatabase.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { promisify } from "util";
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
    token,
    data: user,
  });
};

const signUp = catchAsync(async (req, res, next) => {
  const { full_name, email, password, password_confirm } = req.body;
  // console.log(full_name);
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
  console.log(email, password);
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

const protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    throw next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await getUserById(decoded.id);
  req.user = user;
  // req.locals.user = user;
  next();
});

const editUser = catchAsync(async (req, res, next) => {
  const { full_name, image } = req.body;
  const { user_id } = req.user;
  const toBeUpdated = {
    full_name,
    image,
  };
  const updatedUser = await updateUser(toBeUpdated, user_id);
  console.log(updatedUser);
  if (!updatedUser || updatedUser.severity === "ERROR") {
    return next(new AppError("couldn't updated that user", 400));
  }
  res.status(200).json({
    status: "successful",
    data: updatedUser,
  });
});

const updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const { user } = req;
  if (!(await bcrypt.compare(currentPassword, user.password))) {
    return next(
      new AppError(
        "The password is not correct, please try again with the correct password.",
        400
      )
    );
  }
  const encryptedPassword = await bcrypt.hash(newPassword, 10);
  const updatedUser = await updatePasswordDb(encryptedPassword, user.user_id);
  if (!updatedUser || updatedUser.severity === "ERROR") {
    return next(new AppError("couldn't change user's password", 400));
  }
  res.status(200).json({
    status: "successful",
    data: updatedUser,
  });
});
export { signUp, login, protect, updatePassword, editUser };
