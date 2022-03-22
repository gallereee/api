import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "prisma/service";
import { Account } from "@gallereee/db-client";
import { isNull } from "lodash";

@Injectable()
export class AccountService {
	constructor(private readonly prisma: PrismaService) {}

	async getByUsername(username: Account["username"]) {
		const account = await this.prisma.account.findUnique({
			where: { username },
		});

		if (isNull(account)) {
			throw new NotFoundException("Wrong username");
		}

		return account;
	}

	get(id: Account["id"]) {
		return this.prisma.account.findUnique({ where: { id } });
	}
}
