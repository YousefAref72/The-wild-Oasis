import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import cabinRouter from "./routes/cabinRountes.js";
import settingRouter from "./routes/settingRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import userRouter from "./routes/userRoutes.js";

import { globalErrorHandler } from "./utils/helpers.js";
import AppError from "./utils/AppError.js";

const app = express();
// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//     CORS_ORIGIN: true,
//   })
// );
app.use(cors());
app.options("*", cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.json());

app.use("/api/v1/cabins", cabinRouter);
app.use("/api/v1/settings", settingRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/users", userRouter);
app.use("/", (req, res, next) =>
  next(new AppError("No such Route Founded....", 404))
);
app.use(globalErrorHandler);
export default app;
