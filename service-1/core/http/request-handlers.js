import { v4 as uuidv4 } from "uuid";
import { logger } from "../logger/index.js";

export const createRequestId = (req, res, next) => {
  const requestId = uuidv4();
  res.locals.requestId = requestId;
  next();
};

export const loggerMiddleware = (req, res, next) => {
  logger.info({
    message: "REQUEST IS HANDLED",
    path: req.path,
    method: String(req.method).toUpperCase(),
    requestId: res.locals.requestId,
  });
  next();
};
