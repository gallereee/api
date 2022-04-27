import { Injectable } from "@nestjs/common";
import { TelegramSeamlessAuthFields, TelegramWebAppAuthFields } from "auth/dto";
import config from "config";
import { Account, AccountProviderType, IAMService } from "@gallereee/iam";

@Injectable()
export class AuthService {
	constructor(private readonly iamService: IAMService) {}

	async validateTelegramSeamlessAuth(
		requestId: string,
		fields: TelegramSeamlessAuthFields
	): Promise<Account | null> {
		const { createHmac, createHash } = await import("crypto");

		const fieldsKeys = Object.keys(fields);
		const hashKeyIndex = fieldsKeys.indexOf("hash");
		fieldsKeys.splice(hashKeyIndex, 1);

		const dataCheckString = fieldsKeys
			.sort()
			.map((key) => `${key}=${fields[key]}`)
			.join("\n");

		const secretKey = createHash("sha256")
			.update(config().botAccessToken)
			.digest();

		const hash = createHmac("sha256", secretKey)
			.update(dataCheckString)
			.digest("hex");

		const isAuthorized = hash === fields.hash;
		if (!isAuthorized) {
			return null;
		}

		return this.iamService.getByExternalId({
			type: AccountProviderType.TELEGRAM_USER,
			externalAccountId: fields.id,
			requestId,
		});
	}

	async validateTelegramWebAppAuth(
		requestId: string,
		fields: TelegramWebAppAuthFields
	): Promise<Account | null> {
		const { createHmac } = await import("crypto");

		const fieldsKeys = Object.keys(fields);
		const hashKeyIndex = fieldsKeys.indexOf("hash");
		fieldsKeys.splice(hashKeyIndex, 1);

		const dataCheckString = fieldsKeys
			.sort()
			.map((key) => `${key}=${decodeURIComponent(fields[key])}`)
			.join("\n");

		const secretKey = createHmac("sha256", "WebAppData")
			.update(config().botAccessToken)
			.digest();

		const hash = createHmac("sha256", secretKey)
			.update(dataCheckString)
			.digest("hex");

		const isAuthorized = hash === fields.hash;
		if (!isAuthorized) {
			return null;
		}

		const userString = decodeURIComponent(fields.user);
		const user = JSON.parse(userString);

		return this.iamService.getByExternalId({
			type: AccountProviderType.TELEGRAM_USER,
			externalAccountId: user.id.toString(),
			requestId,
		});
	}
}
