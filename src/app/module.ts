import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AccountModule } from "account/module";
import { PostModule } from "post/module";

@Module({
	imports: [ConfigModule.forRoot(), AccountModule, PostModule],
})
export class AppModule {}
