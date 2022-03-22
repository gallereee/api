import { Module } from "@nestjs/common";
import { PhotoSizeService } from "photoSize/service";
import { PrismaModule } from "prisma/module";

@Module({
	imports: [PrismaModule],
	providers: [PhotoSizeService],
	exports: [PhotoSizeService],
})
export class PhotoSizeModule {}
