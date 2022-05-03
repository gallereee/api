import {
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Request,
	UseGuards,
} from "@nestjs/common";
import { PostsService } from "posts/service";
import {
	DeletePostRequestDto,
	DeletePostResponseDto,
	GetPostRequestDto,
	GetPostResponseDto,
} from "posts/dto";
import { isNull } from "lodash";
import { JwtAuthGuard } from "auth/guards/jwt.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("posts")
export class PostsController {
	constructor(private readonly postService: PostsService) {}

	@Get(":id")
	async get(
		@Request() { requestId },
		@Param() { id }: GetPostRequestDto
	): Promise<GetPostResponseDto> {
		const post = await this.postService.getWithAccountAndPhotos(id, requestId);

		if (isNull(post)) {
			throw new NotFoundException("Wrong post id");
		}

		return {
			id: post.id,
			createdAt: post.createdAt,
			updatedAt: post.updatedAt,
			photos: post.photos.map(({ id: photoId, width, height }) => {
				return { id: photoId, width, height };
			}),
			account: {
				id: post.account.id,
				username: post.account.username,
			},
		};
	}

	@Delete(":id")
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async delete(
		@Request() { requestId, user },
		@Param() { id }: DeletePostRequestDto
	): Promise<DeletePostResponseDto> {
		return this.postService.deletePost(id, user.id, requestId);
	}
}
