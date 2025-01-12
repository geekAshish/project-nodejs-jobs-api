import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import { connectDB } from "./db/connect";

import { errorHandlerMiddleware } from "./middleware/error-handler";
import { notFound } from "./middleware/not-found";
import { auth } from "./middleware/authentication";

import userRoute from "./routes/auth";
import jobRoute from "./routes/job";

config();

const app = express();
const PORT = process.env.PORT || 8080;

// parse application/json
app.use(bodyParser.json());

// middleware
app.use(express.json());

// route
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/jobs", auth, jobRoute);

app.use(notFound as any);
app.use(errorHandlerMiddleware as any);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`server is listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
