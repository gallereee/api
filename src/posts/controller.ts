import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { PostsService } from "posts/service";
import { GetPostRequestDto, GetPostResponseDto } from "posts/dto";
import { isNull } from "lodash";

@Controller("posts")
export class PostsController {
	constructor(private readonly postService: PostsService) {}

	@Get(":id")
	async get(@Param() { id }: GetPostRequestDto): Promise<GetPostResponseDto> {
		const post = await this.postService.get(id);

		if (isNull(post)) {
			throw new NotFoundException("Wrong post id");
		}

		return {
			id: post.id,
			createdAt: post.createdAt,
			updatedAt: post.updatedAt,
			photos: post.photos.map(({ id: photoId, photoSizes }) => {
				const largestPhoto = photoSizes[photoSizes.length - 1];
				const { width, height } = largestPhoto;

				return { id: photoId, width, height };
			}),
		};
	}
}
