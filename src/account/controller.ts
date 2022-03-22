import { Controller, Get, Param } from "@nestjs/common";
import { AccountService } from "account/service";
import { PostService } from "post/service";
import { GetAccountRequestDto, GetAccountPhotosRequestDto } from "account/dto";

@Controller("accounts")
export class AccountController {
	constructor(
		private readonly accountService: AccountService,
		private readonly postService: PostService
	) {}

	@Get(":username")
	async get(@Param() { username }: GetAccountRequestDto) {
		const { id } = await this.accountService.getByUsername(username);

		return { id, username };
	}

	@Get(":username/posts")
	async getPosts(@Param() { username }: GetAccountPhotosRequestDto) {
		const { id: accountId } = await this.accountService.getByUsername(username);

		return this.postService.findAllByAccountId(accountId);
	}
}
