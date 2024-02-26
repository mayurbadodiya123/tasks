import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { ApiError } from "./exception/default-error";
import type { ErrorRequestHandler } from "express";
import { APP_CONFIG } from "../config/app.config";

export const errorConverter: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode
      ? error.statusCode
      : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

export const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode, message } = err;
  if (APP_CONFIG.ENV_TYPE === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }
  res.locals.errorMessage = err.message;
  statusCode === 500 && logInternalServerError(req, err);
  const response = {
    code: statusCode,
    message,
    ...(APP_CONFIG.ENV_TYPE === "development" && { stack: err.stack }),
  };

  res.status(statusCode).send(response);
};

const logInternalServerError = (req: Request, error: any) => {
  const requestedUrl = req.protocol + "://" + req.get("Host") + req.url;
  let request = {
    method: req.method,
    query: req.query,
    params: req.params,
    body: req.body,
    requestedUrl,
  };
  const errorLog = { request, error: error.stack };
  console.log(errorLog);
};
