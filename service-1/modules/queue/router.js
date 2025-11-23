import { Router } from "express";
import { pushMessage } from "./controller.js";

const router = Router();

router.post("/message", pushMessage);

export default router;
