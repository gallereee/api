import { IAMService, Account } from "@gallereee/iam";
import { PMSService } from "@gallereee/pms";
import { Injectable } from "@nestjs/common";
import { GetAccountPostsResponseDto } from "accounts/dto";

@Injectable()
export class AccountsService {
	constructor(
		private readonly iamService: IAMService,
		private readonly pmsService: PMSService
	) {}

	async getByUsername(
		username: Account["username"],
		requestId: string
	): Promise<Account | null> {
		return this.iamService.getByUsername({ username, requestId });
	}

	async get(id: Account["id"], requestId: string): Promise<Account | null> {
		return this.iamService.get({ id, requestId });
	}

	async getPosts(
		id: Account["id"],
		requestId: string
	): Promise<GetAccountPostsResponseDto[]> {
		return this.pmsService.getAccountPosts({ accountId: id, requestId });
	}
}
