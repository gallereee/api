import { Controller, Get, Param } from "@nestjs/common";
import { PhotoService } from "photo/service";
import { GetPhotoByIdRequestDto, GetPhotoByIdResponseDto } from "photo/dto";

@Controller("photos")
export class PhotoController {
	constructor(private readonly photoService: PhotoService) {}

	@Get(":id/file")
	async getById(
		@Param() { id }: GetPhotoByIdRequestDto
	): Promise<GetPhotoByIdResponseDto> {
		return {
			fileUrl: await this.photoService.getLargestPhotoFileUrl(id),
		};
	}
}
