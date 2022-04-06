import { Photo } from "@gallereee/pms";
import { ApiProperty } from "@nestjs/swagger";

class GetPhotoByIdRequestDto {
	@ApiProperty({ type: String })
	id: Photo["id"];
}

export { GetPhotoByIdRequestDto };
