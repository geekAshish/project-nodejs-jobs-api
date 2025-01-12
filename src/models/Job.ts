import { model, Schema, Types } from "mongoose";

const JobsSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, "Please Provide a company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide a position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["pending", "interview", "declined"],
      default: "pending",
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true }
);

export const JobsModel = model("Job", JobsSchema);
