interface TelegramOkResponse<ResponseType> {
	ok: true;
	result: ResponseType;
}

interface TelegramErrorResponse {
	ok: false;
	error_code: number;
	description: string;
}

type TelegramResponse<ResponseType> =
	| TelegramOkResponse<ResponseType>
	| TelegramErrorResponse;

interface TelegramGetFileResponse {
	file_id: string;
	file_unique_id: string;
	file_size: number;
	file_path: string;
}

export type { TelegramResponse, TelegramGetFileResponse };
