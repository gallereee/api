import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/service";
import { Account } from "@gallereee/db-client";

@Injectable()
export class AccountService {
	constructor(private readonly prisma: PrismaService) {}

	getByUsername(username: Account["username"]) {
		return this.prisma.account.findUnique({ where: { username } });
	}

	get(id: Account["id"]) {
		return this.prisma.account.findUnique({ where: { id } });
	}
}
