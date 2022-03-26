import { IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Photo, Post } from "@gallereee/db-client";

class GetPostRequestDto {
	@IsNumber()
	@ApiProperty({
		type: Number,
	})
	@Type(() => Number)
	id: Post["id"];
}

type GetPostResponsePhoto = Pick<Photo, "id" | "createdAt" | "updatedAt">;

class GetPostResponseDto {
	id: Post["id"];

	photos: GetPostResponsePhoto[];
}

export { GetPostRequestDto, GetPostResponseDto };
