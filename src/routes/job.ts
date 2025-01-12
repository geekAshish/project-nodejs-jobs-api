import { Router } from "express";
import {
  createJob,
  deleteJob,
  getJob,
  getJobs,
  updateJob,
} from "../controller/jobs";

const jobRoute = Router();

jobRoute.route("/").get(getJobs).post(createJob);
jobRoute.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

export default jobRoute;
