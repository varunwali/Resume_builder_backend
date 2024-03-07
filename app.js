import express from "express";
import { config } from "dotenv";
import userRoute from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
import corsOptions from "./config/corscontroller.js";

const app = express(); //creating the express instance
config({ path: "./config/config.env" }); //loading environment variables

app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});

dbConnection();

app.use(cors(corsOptions));

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

app.use(errorMiddleware);

export default app;
