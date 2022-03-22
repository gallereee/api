import { Injectable } from "@nestjs/common";
import { Account } from "@gallereee/db-client";
import { PrismaService } from "prisma/service";

@Injectable()
export class PostService {
	constructor(private readonly prisma: PrismaService) {}

	async findAllByAccountId(id: Account["id"]) {
		return this.prisma.post.findMany({
			where: { accountId: id },
			include: { photos: true },
		});
	}
}
