import { IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

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

export { GetAccountRequestDto, GetAccountPhotosRequestDto };
