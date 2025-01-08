import mongoose from "mongoose";

export const connectDB = (URL: string | undefined) => {
  if (URL) {
    return mongoose.connect(URL); // returns a promise
  }
};
