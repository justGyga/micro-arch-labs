import type { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../logger";

export const createRequestId: RequestHandler = (req, res, next) => {
    const requestId = uuidv4();
    res.locals.requestId = requestId;
    next();
};

export const loggerMiddleware: RequestHandler = (req, res, next) => {
    logger.info({
        message: "REQUEST IS HANDLED",
        path: req.path,
        method: String(req.method).toUpperCase(),
        requestId: res.locals.requestId
    });
    next();
};
