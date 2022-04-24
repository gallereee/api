import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "app/module";
import { ValidationPipe } from "@nestjs/common";
import config from "config";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });

	app.setGlobalPrefix(config().globalPrefix);
	app.useGlobalPipes(new ValidationPipe({ transform: true }));
	app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

	const swaggerConfig = new DocumentBuilder()
		.setTitle("Galleree")
		.setDescription("API for Galleree")
		.setVersion(process.version)
		.addSecurity("bearer", {
			type: "http",
			scheme: "bearer",
		})
		.build();
	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup(`${config().globalPrefix}/spec`, app, document);

	await app.listen(config().port);
}
bootstrap();
