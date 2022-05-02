import {
	Controller,
	Post,
	Body,
	Request,
	UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "auth/service";
import {
	AuthTelegramSeamlessRequestDto,
	AuthTelegramSeamlessResponseDto,
	AuthTelegramWebAppRequestDto,
	AuthTelegramWebAppResponseDto,
	JwtPayload,
} from "auth/dto";
import { JwtService } from "@nestjs/jwt";
import { isNull } from "lodash";

@Controller("auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly jwtService: JwtService
	) {}

	@Post("telegram/seamless")
	async authTelegramSeamless(
		@Request() { requestId },
		@Body() authFields: AuthTelegramSeamlessRequestDto
	): Promise<AuthTelegramSeamlessResponseDto> {
		const account = await this.authService.validateTelegramSeamlessAuth(
			requestId,
			authFields
		);

		if (isNull(account)) {
			throw new UnauthorizedException();
		}

		const { id, username } = account;

		const payload: JwtPayload = {
			id,
			username,
		};

		return {
			accessToken: this.jwtService.sign(payload),
			accountUsername: account.username,
		};
	}

	@Post("telegram/web-app")
	async authTelegramWebApp(
		@Request() { requestId },
		@Body() authFields: AuthTelegramWebAppRequestDto
	): Promise<AuthTelegramWebAppResponseDto> {
		const account = await this.authService.validateTelegramWebAppAuth(
			requestId,
			authFields
		);

		if (isNull(account)) {
			throw new UnauthorizedException();
		}

		const { id, username } = account;

		const payload: JwtPayload = {
			id,
			username,
		};

		return {
			accessToken: this.jwtService.sign(payload),
			accountUsername: account.username,
		};
	}
}
