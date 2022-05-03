import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Account } from "@gallereee/iam";

type JwtPayload = Pick<Account, "id" | "username">;

class TelegramSeamlessAuthFields {
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

class TelegramWebAppAuthFields {
	@IsString()
	@ApiProperty({ type: String })
	query_id: string;

	@IsString()
	@ApiProperty({ type: String })
	hash: string;

	@IsString()
	@ApiProperty({ type: String })
	user: string;

	@IsString()
	@ApiProperty({ type: String })
	auth_date: string;
}

class DevAuthFields {
	@IsString()
	@ApiProperty({ type: String })
	id: string;

	@IsString()
	@ApiProperty({ type: String })
	username: string;
}

class AuthTelegramSeamlessRequestDto extends TelegramSeamlessAuthFields {}
class AuthTelegramSeamlessResponseDto {
	accessToken: string;

	accountUsername: Account["username"];
}

class AuthTelegramWebAppRequestDto extends TelegramWebAppAuthFields {}
class AuthTelegramWebAppResponseDto {
	accessToken: string;

	accountUsername: Account["username"];
}

class AuthDevRequestDto extends DevAuthFields {}
class AuthDevResponseDto {
	accessToken: string;

	accountUsername: Account["username"];
}

export type { JwtPayload };
export {
	TelegramSeamlessAuthFields,
	TelegramWebAppAuthFields,
	AuthTelegramSeamlessResponseDto,
	AuthTelegramSeamlessRequestDto,
	AuthTelegramWebAppRequestDto,
	AuthTelegramWebAppResponseDto,
	AuthDevRequestDto,
	AuthDevResponseDto,
};
