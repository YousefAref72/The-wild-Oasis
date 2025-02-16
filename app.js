import express from "express";
import cabinRouter from "./routes/cabinRountes.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.json());

app.use("/api/v1/cabins", cabinRouter);
app.use("/", (req, res, next) =>
  next(new AppError("No such Route Founded....", 404))
);
export default app;
