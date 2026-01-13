import { boundClass } from "autobind-decorator";
import type { Request, Response } from "express";

@boundClass
export class Controller {
    async signIn(req: Request, res: Response): Promise<void> {
        return;
    }

    async signUp(req: Request, res: Response): Promise<void> {
        return;
    }

    async signOut(req: Request, res: Response): Promise<void> {
        return;
    }
}
