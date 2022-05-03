import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { JwtPayload } from "auth/dto";
import { ExtractJwt, Strategy } from "passport-jwt";
import config from "config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: config().jwtSecret,
		});
	}

	async validate(account: JwtPayload): Promise<JwtPayload> {
		return account;
	}
}
