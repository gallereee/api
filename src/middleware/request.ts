import { Request, Response, NextFunction } from "express";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { nanoid } from "nanoid";

@Injectable()
export class RequestMiddleware implements NestMiddleware {
	async use(req: Request, res: Response, next: NextFunction) {
		req.requestId = nanoid();

		next();
	}
}
