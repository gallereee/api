import { Controller, Get, Param } from "@nestjs/common";
import { AccountsService } from "accounts/service";
import { PostsService } from "posts/service";
import {
	GetAccountRequestDto,
	GetAccountPhotosRequestDto,
	GetAccountPhotosResponseDto,
} from "accounts/dto";

@Controller("accounts")
export class AccountsController {
	constructor(
		private readonly accountService: AccountsService,
		private readonly postService: PostsService
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
