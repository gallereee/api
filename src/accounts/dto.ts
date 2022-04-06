import { IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Post, Photo } from "@gallereee/pms";
import { Account } from "@gallereee/iam";

// GetAccount

class GetAccountRequestDto {
	@IsString()
	@MinLength(2)
	@ApiProperty()
	username: string;
}
type GetAccountResponseDto = Pick<Account, "id" | "username">;

// GetAccountPosts

class GetAccountPostsRequestDto {
	@IsString()
	@MinLength(2)
	@ApiProperty()
	username: string;
}
interface GetAccountPostsResponseDto {
	id: Post["id"];
	coverPhotoId: Photo["id"];
}

export { GetAccountRequestDto, GetAccountPostsRequestDto };
export type { GetAccountResponseDto, GetAccountPostsResponseDto };
