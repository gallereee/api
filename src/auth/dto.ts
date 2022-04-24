import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Account } from "@gallereee/iam";

type JwtPayload = Pick<Account, "id" | "username">;

class TelegramAuthFields {
	@IsString()
	@ApiProperty({ type: String })
	id: string;

	@IsString()
	@ApiProperty({ type: String })
	hash: string;

	@IsString()
	@ApiProperty({ type: String })
	auth_date: string;

	@IsString()
	@ApiProperty({ type: String })
	first_name: string;

	@IsString()
	@ApiProperty({ type: String })
	last_name: string;

	@IsString()
	@ApiProperty({ type: String })
	photo_url: string;

	@IsString()
	@ApiProperty({ type: String })
	username: string;
}

class AuthTelegramRequestDto extends TelegramAuthFields {}
class AuthTelegramResponseDto {
	accessToken: string;
}

export type { JwtPayload };
export { TelegramAuthFields, AuthTelegramResponseDto, AuthTelegramRequestDto };
