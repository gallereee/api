import { Module } from "@nestjs/common";
import { PostService } from "post/service";
import { PrismaModule } from "prisma/module";
import { PostController } from "post/controller";

@Module({
	controllers: [PostController],
	providers: [PostService],
	imports: [PrismaModule],
	exports: [PostService],
})
export class PostModule {}
