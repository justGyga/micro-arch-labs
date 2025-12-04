import express from "express";
import { createServer } from "node:http";
import { logger } from "../logger/index.js";
import { createRequestId, loggerMiddleware } from "./request-handlers.js";

/**
 * @param {number} port
 * @param {import("express").Router[]} routes
 */
export const runHttp = async (port, routes = []) => {
  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "10mb" }));
  app.use(createRequestId, loggerMiddleware);

  app.get("", (req, res) => {
    logger.info({
      message: "REQUEST IS HANDLED",
      query: req.query,
      requestId: res.locals.requestId,
    });
    res.status(200).json(req.query);
  });

  routes.forEach((router) => app.use(router));

  server.listen(port, () => console.log(`Http run on port ${port}`));
};
