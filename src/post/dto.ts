import { Photo, Post } from "@gallereee/db-client";
import { ApiProperty } from "@nestjs/swagger";

class GetPostRequestDto {
	@ApiProperty({ type: String })
	id: Post["id"];
}

interface GetPostResponseDto {
	id: Post["id"];
	createdAt: Post["createdAt"];
	updatedAt: Post["updatedAt"];
	photoIds: Photo["id"][];
}

export { GetPostRequestDto };
export type { GetPostResponseDto };
