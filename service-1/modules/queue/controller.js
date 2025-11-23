import { pushToQueue } from "../../core/queue.js";

export function pushMessage(req, res) {
  const message = JSON.stringify(req.body);
  pushToQueue(message);
  res.status(201).json({ message: "ok" });
}
