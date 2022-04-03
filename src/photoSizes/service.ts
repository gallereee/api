import { Injectable } from "@nestjs/common";
import { Photo } from "@gallereee/db-client";
import { PrismaService } from "prisma/service";

@Injectable()
export class PhotoSizesService {
	constructor(private readonly prisma: PrismaService) {}

	async getLargestSizeForPhoto(photoId: Photo["id"]) {
		return this.prisma.photoSize.findFirst({
			where: { photoId },
			orderBy: { width: "desc" },
		});
	}
}
