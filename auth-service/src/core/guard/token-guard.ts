import type { NextFunction, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { logger } from "../logger";
import type { RequestIdLocals } from "../logger/types";
import { IJwt, ResponseSessionPayload } from "./types";

let tokenSecret: string;
let tokenExpiresIn: string;

export class TokenGuard {
    static init(secret: string, expiresIn: string): void {
        tokenSecret = secret;
        tokenExpiresIn = expiresIn;
    }

    static verify = async (req: Request, res: Response<unknown, RequestIdLocals & ResponseSessionPayload>, next: NextFunction) => {
        try {
            const { authorization } = req.headers;
            const token = authorization.split(" ")[1];
            if (!token) throw new Error();

            const tokenPayload = verify(token, tokenSecret);
            res.locals.sessionInfo = tokenPayload as IJwt;
            next();
        } catch (error: any) {
            res.status(401).json({ message: "Unauthorized" });
            logger.error({ message: error.message, requestId: res.locals.requestId });
        }
    };

    // @ts-ignore
    static generate = async (payload: IJwt): Promise<string> => sign(payload, tokenSecret, { expiresIn: tokenExpiresIn });
}
