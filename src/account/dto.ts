import { IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

class GetAccountDto {
	@IsString()
	@MinLength(2)
	@ApiProperty()
	username: string;
}
class GetAccountPhotosDto {
	@IsString()
	@MinLength(2)
	@ApiProperty()
	username: string;
}

export { GetAccountDto, GetAccountPhotosDto };
