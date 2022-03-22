import { IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Photo } from "@gallereee/db-client";
import { Type } from "class-transformer";

class GetPhotoByIdRequestDto {
	@IsInt()
	@ApiProperty({
		type: Number,
	})
	@Type(() => Number)
	id: Photo["id"];
}

class GetPhotoByIdResponseDto {
	fileUrl: string;
}

export { GetPhotoByIdRequestDto, GetPhotoByIdResponseDto };
