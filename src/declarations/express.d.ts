export default null;

declare global {
	namespace Express {
		interface Request {
			requestId: string;
		}
	}
}
