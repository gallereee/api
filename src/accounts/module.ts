import { Module } from "@nestjs/common";
import { AccountsService } from "accounts/service";
import { AccountsController } from "accounts/controller";
import { PrismaModule } from "prisma/module";
import { PostsModule } from "posts/module";

@Module({
	imports: [PrismaModule, PostsModule],
	controllers: [AccountsController],
	providers: [AccountsService],
	exports: [AccountsService],
})
export class AccountsModule {}
