import express from "express";
import { createServer } from "node:http";

/**
 * @param {number} port
 * @param {import("express").Router[]} routes
 */
export const runHttp = async (port, routes = []) => {
  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "10mb" }));

  app.get("", (req, res) => {
    console.log(`REQUEST IS HANDLED, QUERY ${JSON.stringify(req.query)}`);
    res.status(200).json(req.query);
  });

  routes.forEach((router) => app.use(router));

  server.listen(port, () => console.log(`Http run on port ${port}`));
};
