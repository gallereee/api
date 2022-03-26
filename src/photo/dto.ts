import { Photo } from "@gallereee/db-client";
import { ApiProperty } from "@nestjs/swagger";

class GetPhotoByIdRequestDto {
	@ApiProperty({ type: String })
	id: Photo["id"];
}

export { GetPhotoByIdRequestDto };
