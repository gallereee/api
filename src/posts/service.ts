import { Photo, PMSService, Post } from "@gallereee/pms";
import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { Account, IAMService } from "@gallereee/iam";
import { isNull } from "lodash";

@Injectable()
export class PostsService {
	constructor(
		private readonly pmsService: PMSService,
		private readonly iamService: IAMService
	) {}

	async getWithAccountAndPhotos(
		id: Post["id"],
		requestId: string
	): Promise<Post & { account: Account; photos: Photo[] }> {
		const post = await this.pmsService.getPost({
			id,
			requestId,
		});

		const account = await this.iamService.get({
			id: post.accountId,
			requestId,
		});

		return { ...post, account };
	}

	async deletePost(
		id: Post["id"],
		accountId: Account["id"],
		requestId: string
	): Promise<null> {
		const post = await this.pmsService.getPost({
			id,
			requestId,
		});

		if (isNull(post)) {
			throw new NotFoundException();
		}

		if (post.accountId !== accountId) {
			throw new ForbiddenException();
		}

		return this.pmsService.deletePost({ id, requestId });
	}
}
