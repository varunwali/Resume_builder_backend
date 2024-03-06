import express from "express";
import { config } from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";

process.env.NODE_OPTIONS = "--max-old-space-size=4096";
const app = express(); //creating the express instance
config({ path: "./config/config.env" }); //loading environment variables

app.use(
  cors({
    origin: [process.env.FRONTEND_URL], // origin is to set to allow requests only from our frontend url
    methods: ["GET", "PUT", "DELETE", "PUT"], //these  are the allowed request types to be made by the user
    credentials: true, //this allows us to use cookies in our application
  })
); //enabling CORS to  allow requests from different origins

app.use(cookieParser());
app.use(express.json()); //parsing incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoute);
dbConnection();

app.use(errorMiddleware);
export default app;
