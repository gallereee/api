import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AccountsModule } from "accounts/module";
import { PostsModule } from "posts/module";
import { PhotosModule } from "photos/module";
import { WinstonModule } from "nest-winston";
import { PMSModule } from "@gallereee/pms";
import { IAMModule } from "@gallereee/iam";
import config from "config";
import * as winston from "winston";
import { RequestMiddleware } from "middleware/request";

const WinstonModuleRoot = WinstonModule.forRoot({
	level: "info",
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.json()
	),
	exitOnError: false,
	transports: [
		new winston.transports.File({
			filename: "logs/error.log",
			level: "error",
		}),
		new winston.transports.File({ filename: "logs/combined.log" }),
	],
});

const PMSModuleRoot = PMSModule.register({
	host: config().PMSService.host,
	port: config().PMSService.port,
});

const IAMModuleRoot = IAMModule.register({
	host: config().IAMService.host,
	port: config().IAMService.port,
});

@Module({
	imports: [
		ConfigModule.forRoot(),
		WinstonModuleRoot,
		PMSModuleRoot,
		IAMModuleRoot,
		AccountsModule,
		PostsModule,
		PhotosModule,
	],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(RequestMiddleware);
	}
}
