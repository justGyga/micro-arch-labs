import { request } from "express";
import { pushToQueue } from "../../core/queue.js";

export function pushMessage(req, res) {
  const message = JSON.stringify({
    ...req.query,
    requestId: res.locals.requestId,
  });
  pushToQueue(message);
  res.status(201).json({ message: "ok" });
}
