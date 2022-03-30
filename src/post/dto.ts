import { Photo, Post } from "@gallereee/db-client";
import { ApiProperty } from "@nestjs/swagger";

class GetPostRequestDto {
	@ApiProperty({ type: String })
	id: Post["id"];
}

interface GetPostPhoto {
	id: Photo["id"];
	width: number;
	height: number;
}

interface GetPostResponseDto {
	id: Post["id"];
	createdAt: Post["createdAt"];
	updatedAt: Post["updatedAt"];
	photos: GetPostPhoto[];
}

export { GetPostRequestDto };
export type { GetPostResponseDto };
