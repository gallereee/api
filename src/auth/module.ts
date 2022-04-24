import { Module } from "@nestjs/common";
import { AuthService } from "auth/service";
import { AuthController } from "auth/controller";
import { JwtStrategy } from "auth/strategies/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import config from "config";

@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			secret: config().jwtSecret,
			signOptions: { expiresIn: "7d" },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
