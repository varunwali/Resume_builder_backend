import express from "express";
import { config } from "dotenv";
import userRoute from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";

const app = express(); //creating the express instance
config({ path: "./config/config.env" }); //loading environment variables

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://resume-builder-frontend-amber.vercel.app"
  );
  // You can also set other CORS headers if needed
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Allow the preflight request to proceed
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

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
