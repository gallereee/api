import { Module } from "@nestjs/common";
import { PhotosService } from "photos/service";
import { PhotosController } from "photos/controller";
import { PrismaModule } from "prisma/module";
import { PhotoSizesModule } from "photoSizes/module";

@Module({
	imports: [PrismaModule, PhotoSizesModule],
	controllers: [PhotosController],
	providers: [PhotosService],
	exports: [PhotosService],
})
export class PhotosModule {}
