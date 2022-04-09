import { Photo, PMSService, Post } from "@gallereee/pms";
import { Injectable } from "@nestjs/common";
import { Account, IAMService } from "@gallereee/iam";

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
}
