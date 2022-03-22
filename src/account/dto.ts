import { IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

class GetAccountPhotosDto {
	@IsString()
	@MinLength(2)
	@ApiProperty()
	username: string;
}

export { GetAccountPhotosDto };
