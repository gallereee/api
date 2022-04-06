import { PMSService, Post } from "@gallereee/pms";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PostsService {
	constructor(private readonly pmsService: PMSService) {}

	async get(id: Post["id"], requestId: string) {
		return this.pmsService.getPost({
			id,
			requestId,
		});
	}
}
