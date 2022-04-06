import { Module } from "@nestjs/common";
import { PostsService } from "posts/service";
import { PostsController } from "posts/controller";

@Module({
	controllers: [PostsController],
	providers: [PostsService],
	imports: [],
	exports: [PostsService],
})
export class PostsModule {}
