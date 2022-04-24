import { Controller, Post, Body, Request } from "@nestjs/common";
import { AuthService } from "auth/service";
import {
	AuthTelegramRequestDto,
	AuthTelegramResponseDto,
	JwtPayload,
} from "auth/dto";
import { JwtService } from "@nestjs/jwt";

@Controller("auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly jwtService: JwtService
	) {}

	@Post("telegram")
	async authTelegram(
		@Request() { requestId },
		@Body() authFields: AuthTelegramRequestDto
	): Promise<AuthTelegramResponseDto> {
		const { id, username } = await this.authService.validateTelegramAuth(
			requestId,
			authFields
		);

		const payload: JwtPayload = {
			id,
			username,
		};

		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
