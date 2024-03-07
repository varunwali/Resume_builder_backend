import express from "express";
import userRoute from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
import corsOptions from "./config/corscontroller.js";
import allowedOrigins from "./config/allowedOrigins.js";
const app = express();

// Load environment variables
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

// Connect to the database
dbConnection();

// CORS configuration
app.use(cors(corsOptions));

// Parse cookies
app.use(cookieParser());

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use("/api/v1/user", userRoute);

// Default route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello, World!",
  });
});

// Error handling middleware
app.use(errorMiddleware);

// Set CORS headers manually
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowedOrigins);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

export default app;
