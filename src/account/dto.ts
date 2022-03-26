import { IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Photo, Post } from "@gallereee/db-client";

class GetAccountRequestDto {
	@IsString()
	@MinLength(2)
	@ApiProperty()
	username: string;
}

class GetAccountPhotosRequestDto {
	@IsString()
	@MinLength(2)
	@ApiProperty()
	username: string;
}

interface GetAccountPhotosResponseDto {
	id: Post["id"];
	coverPhotoId: Photo["id"];
}

export { GetAccountRequestDto, GetAccountPhotosRequestDto };
export type { GetAccountPhotosResponseDto };
