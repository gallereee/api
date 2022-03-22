import { Module } from "@nestjs/common";
import { AccountService } from "account/service";
import { AccountController } from "account/controller";
import { PrismaModule } from "prisma/module";
import { PostModule } from "post/module";

@Module({
	imports: [PrismaModule, PostModule],
	controllers: [AccountController],
	providers: [AccountService],
	exports: [AccountService],
})
export class AccountModule {}
