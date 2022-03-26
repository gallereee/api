import { Controller, Get, Param } from "@nestjs/common";
import { AccountService } from "account/service";
import { PostService } from "post/service";
import {
	GetAccountRequestDto,
	GetAccountPhotosRequestDto,
	GetAccountPhotosResponseDto,
} from "account/dto";

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
	async getPosts(
		@Param() { username }: GetAccountPhotosRequestDto
	): Promise<GetAccountPhotosResponseDto[]> {
		const { id: accountId } = await this.accountService.getByUsername(username);

		const posts = await this.postService.findAllByAccountId(accountId);

		return posts.map((post) => ({
			id: post.id,
			coverPhotoId: post.photos[0].id,
		}));
	}
}
