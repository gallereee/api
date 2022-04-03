import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { Photo, PhotoSize } from "@gallereee/db-client";
import { PrismaService } from "prisma/service";
import { PhotoSizesService } from "photoSizes/service";
import config from "config";
import axios from "axios";
import { TelegramGetFileResponse, TelegramResponse } from "types";
import { isNull } from "lodash";

@Injectable()
export class PhotosService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly photoSizeService: PhotoSizesService
	) {}

	async createFilePath(fileId: PhotoSize["fileId"]) {
		const URL = `${config().telegramBotBaseUrl}getFile?file_id=${fileId}`;
		const { data: response } = await axios.get<
			TelegramResponse<TelegramGetFileResponse>
		>(URL);

		if (response.ok === false) {
			throw new BadRequestException(response.description);
		}

		const {
			result: { file_path: filePath },
		} = response;

		return filePath;
	}

	async getFileById(fileId: PhotoSize["fileId"]) {
		const filePath = await this.createFilePath(fileId);

		return `${config().telegramBotFilesBaseUrl}${filePath}`;
	}

	async getLargestPhotoFileUrl(photoId: Photo["id"]) {
		const largestPhotoSize = await this.photoSizeService.getLargestSizeForPhoto(
			photoId
		);

		if (isNull(largestPhotoSize)) {
			throw new NotFoundException("No such photo");
		}

		return this.getFileById(largestPhotoSize.fileId);
	}
}
