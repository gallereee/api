import { Photo, Post } from "@gallereee/pms";
import { ApiProperty } from "@nestjs/swagger";

// GetPost

interface GetPostPhoto {
	id: Photo["id"];
	width: number;
	height: number;
}
class GetPostRequestDto {
	@ApiProperty({ type: String })
	id: Post["id"];
}
interface GetPostResponseDto {
	id: Post["id"];
	createdAt: Post["createdAt"];
	updatedAt: Post["updatedAt"];
	photos: GetPostPhoto[];
}

export { GetPostRequestDto };
export type { GetPostResponseDto };
