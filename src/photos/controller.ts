import {
	Controller,
	Get,
	Param,
	Request,
	Res,
	StreamableFile,
} from "@nestjs/common";
import { Response } from "express";
import { GetPhotoByIdRequestDto } from "photos/dto";
import { PhotosService } from "photos/service";

@Controller("photos")
export class PhotosController {
	constructor(private readonly photosService: PhotosService) {}

	@Get(":id/file")
	async getById(
		@Request() { requestId },
		@Param() { id }: GetPhotoByIdRequestDto,
		@Res({ passthrough: true }) res: Response
	): Promise<StreamableFile> {
		return this.photosService.streamPhotoFile(id, res, requestId);
	}
}
