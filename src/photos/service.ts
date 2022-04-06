import { Photo, PMSService } from "@gallereee/pms";
import { Injectable, StreamableFile } from "@nestjs/common";
import axios from "axios";
import { Response } from "express";

@Injectable()
export class PhotosService {
	constructor(private readonly pmsService: PMSService) {}

	async streamPhotoFile(
		id: Photo["id"],
		res: Response,
		requestId: string
	): Promise<StreamableFile> {
		const fileUrl = await this.pmsService.getPhotoFileUrl({ id, requestId });

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
