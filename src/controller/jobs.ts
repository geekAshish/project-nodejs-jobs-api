import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { GetUserAuthInfoRequest } from "../modules/interface/auth";
import { JobsModel } from "../models/Job";
import { errors } from "../error";

export const getJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jobs = await JobsModel.find({
    createdBy: (req as GetUserAuthInfoRequest).user.userId,
  }).sort("createdAt");

  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};
export const getJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req as GetUserAuthInfoRequest;

  const job = await JobsModel.findOne({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new errors.NotFound(`No Job found`);
  }

  res.status(StatusCodes.OK).json(job);
};
export const createJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.body.createdBy = (req as GetUserAuthInfoRequest).user.userId;
  const job = await JobsModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const updateJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req as GetUserAuthInfoRequest;

  if (company === "" || position === "") {
    throw new errors.BadRequest(`Company or position can't be empty`);
  }

  const job = await JobsModel.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new errors.NotFound(`No Job found`);
  }

  res.status(StatusCodes.OK).json({ job });
};

export const deleteJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req as GetUserAuthInfoRequest;

  // findOneAndDelete, findByIdAndDelete, findByIdAndRemove
  const job = await JobsModel.findOneAndDelete({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new errors.NotFound(`No Job found`);
  }

  res.status(StatusCodes.OK).json({});
};
