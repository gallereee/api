import { Module } from "@nestjs/common";
import { PhotoSizesService } from "photoSizes/service";
import { PrismaModule } from "prisma/module";

@Module({
	imports: [PrismaModule],
	providers: [PhotoSizesService],
	exports: [PhotoSizesService],
})
export class PhotoSizesModule {}
