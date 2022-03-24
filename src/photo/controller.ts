import { Controller, Get, Param, Res, StreamableFile } from "@nestjs/common";
import { Response } from "express";
import { PhotoService } from "photo/service";
import { GetPhotoByIdRequestDto } from "photo/dto";
import axios from "axios";

@Controller("photos")
export class PhotoController {
	constructor(private readonly photoService: PhotoService) {}

	@Get(":id/file")
	async getById(
		@Param() { id }: GetPhotoByIdRequestDto,
		@Res({ passthrough: true }) res: Response
	): Promise<StreamableFile> {
		const fileUrl = await this.photoService.getLargestPhotoFileUrl(id);

		const fileResponse = await axios({
			method: "get",
			url: fileUrl,
			responseType: "stream",
		});

		Object.entries(fileResponse.headers).forEach(([key, value]) =>
			res.set(key, value)
		);

		return new StreamableFile(fileResponse.data);
	}
}
