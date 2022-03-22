import { BadRequestException, Controller, Get, Param } from "@nestjs/common";
import { AccountService } from "account/service";
import { PostService } from "post/service";
import { GetAccountPhotosDto } from "account/dto";
import { isNull } from "lodash";

@Controller("account")
export class AccountController {
	constructor(
		private readonly accountService: AccountService,
		private readonly postService: PostService
	) {}

	@Get(":username/posts")
	async getPosts(@Param() { username }: GetAccountPhotosDto) {
		const account = await this.accountService.getByUsername(username);

		if (isNull(account)) {
			throw new BadRequestException("Wrong username");
		}

		return this.postService.findAllByAccountId(account.id);
	}
}
