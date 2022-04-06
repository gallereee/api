import {
	Controller,
	Get,
	NotFoundException,
	Param,
	Request,
} from "@nestjs/common";
import { PostsService } from "posts/service";
import { GetPostRequestDto, GetPostResponseDto } from "posts/dto";
import { isNull } from "lodash";

@Controller("posts")
export class PostsController {
	constructor(private readonly postService: PostsService) {}

	@Get(":id")
	async get(
		@Request() { requestId },
		@Param() { id }: GetPostRequestDto
	): Promise<GetPostResponseDto> {
		const post = await this.postService.get(id, requestId);

		if (isNull(post)) {
			throw new NotFoundException("Wrong post id");
		}

		return {
			id: post.id,
			createdAt: post.createdAt,
			updatedAt: post.updatedAt,
			photos: post.photos.map(({ id: photoid, width, height }) => {
				return { id: photoid, width, height };
			}),
		};
	}
}
