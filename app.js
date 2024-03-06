import express from "express";
import { config } from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";

const app = express(); //creating the express instance
config({ path: "./config/config.env" }); //loading environment variables

// Define allowed origins
const allowedOrigins = ["https://resume-builder-frontend-amber.vercel.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the origin is in the allowed origins list
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"], //these are the allowed request types to be made by the user
    credentials: true, //this allows us to use cookies in our application
  })
); //enabling CORS to allow requests from different origins

app.use(cookieParser());
app.use(express.json()); //parsing incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoute);
dbConnection();

app.use(errorMiddleware);

export default app;
