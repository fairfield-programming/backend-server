import { Express, Request } from 'express';

// extend Express Request type
declare namespace Express {
	export interface IRequest extends Request {
		user: any;
	}
}
