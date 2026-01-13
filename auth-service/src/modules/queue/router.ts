import { Router } from "express";
import { pushMessage } from "./controller.js";

const router = Router();

router.get("/message", pushMessage);

export default router;
