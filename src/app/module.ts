import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AccountModule } from "account/module";
import { PostModule } from "post/module";
import { PhotoModule } from "photo/module";
import { PhotoSizeModule } from "photoSize/module";

@Module({
	imports: [
		ConfigModule.forRoot(),
		AccountModule,
		PostModule,
		PhotoModule,
		PhotoSizeModule,
	],
})
export class AppModule {}
