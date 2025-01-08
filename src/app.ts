import express from "express";
import { config } from "dotenv";
import { connectDB } from "./db/connect";
import { errorHandlerMiddleware } from "./middleware/error-handler";
import { notFound } from "./middleware/not-found";

config();

const app = express();
const PORT = process.env.PORT || 8080;

// middleware
app.use(express.json());

// route
app.use("/", (req, res, next) => {
  res.send("jobs api");
});

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
