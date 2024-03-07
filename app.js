import express from "express";
import { config } from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";

const app = express(); //creating the express instance
config({ path: "./config/config.env" }); //loading environment variables

app.use(
  cors((req, res, next) => {
    res.header(
      "Access-Control-Allow-Origin",
      "https://resume-builder-frontend-amber.vercel.app"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  })
);

app.use(cookieParser());
app.use(express.json()); //parsing incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoute);
app.get("/", (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "HELLO WORLD AGAIN",
  });
});

dbConnection();

app.use(errorMiddleware);
export default app;
