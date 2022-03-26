import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { PostService } from "post/service";
import { GetPostRequestDto, GetPostResponseDto } from "post/dto";
import { isNull } from "lodash";

@Controller("posts")
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Get(":id")
	async get(@Param() { id }: GetPostRequestDto): Promise<GetPostResponseDto> {
		const post = await this.postService.get(id);

		if (isNull(post)) {
			throw new NotFoundException("Wrong post id");
		}

		return {
			id: post.id,
			photos: post.photos.map(({ id: photoId, createdAt, updatedAt }) => ({
				id: photoId,
				createdAt,
				updatedAt,
			})),
		};
	}
}
