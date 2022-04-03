import { Module } from "@nestjs/common";
import { PostsService } from "posts/service";
import { PrismaModule } from "prisma/module";
import { PostsController } from "posts/controller";

@Module({
	controllers: [PostsController],
	providers: [PostsService],
	imports: [PrismaModule],
	exports: [PostsService],
})
export class PostsModule {}
