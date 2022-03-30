import { Injectable } from "@nestjs/common";
import { Account, Post } from "@gallereee/db-client";
import { PrismaService } from "prisma/service";

@Injectable()
export class PostService {
	constructor(private readonly prisma: PrismaService) {}

	async findAllByAccountId(id: Account["id"]) {
		return this.prisma.post.findMany({
			where: { accountId: id },
			include: { photos: true },
			orderBy: { createdAt: "desc" },
		});
	}

	async get(id: Post["id"]) {
		return this.prisma.post.findUnique({
			where: { id },
			include: { photos: { include: { photoSizes: true } } },
		});
	}
}
