import {
	Controller,
	Get,
	NotFoundException,
	Param,
	Request,
} from "@nestjs/common";
import { AccountsService } from "accounts/service";
import {
	GetAccountRequestDto,
	GetAccountPostsRequestDto,
	GetAccountPostsResponseDto,
	GetAccountResponseDto,
} from "accounts/dto";
import { isNull } from "lodash";

@Controller("accounts")
export class AccountsController {
	constructor(private readonly accountService: AccountsService) {}

	@Get(":username")
	async get(
		@Request() { requestId },
		@Param() { username: requestUsername }: GetAccountRequestDto
	): Promise<GetAccountResponseDto> {
		const account = await this.accountService.getByUsername(
			requestUsername,
			requestId
		);

		if (isNull(account)) {
			throw new NotFoundException("Wrong username");
		}

		const { id, username } = account;
		return { id, username };
	}

	@Get(":username/posts")
	async getPosts(
		@Request() { requestId },
		@Param() { username }: GetAccountPostsRequestDto
	): Promise<GetAccountPostsResponseDto[]> {
		const account = await this.accountService.getByUsername(
			username,
			requestId
		);

		return this.accountService.getPosts(account.id, requestId);
	}
}
