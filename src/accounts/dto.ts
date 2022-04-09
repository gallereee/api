import { IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Post, Photo } from "@gallereee/pms";
import { Account } from "@gallereee/iam";

type AccountInfo = Pick<Account, "id" | "username">;

// GetAccount

class GetAccountRequestDto {
	@IsString()
	@MinLength(2)
	@ApiProperty()
	username: string;
}
type GetAccountResponseDto = AccountInfo;

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
export type { AccountInfo, GetAccountResponseDto, GetAccountPostsResponseDto };
