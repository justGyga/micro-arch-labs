import type { Request, Response } from "express";
import { pushToQueue } from "../../core/queue/index.js";

export function pushMessage(req: Request, res: Response) {
    const message = {
        ...req.query,
        requestId: res.locals.requestId
    };
    pushToQueue(message);
    res.status(201).json({ message: "ok" });
}
