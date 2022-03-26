import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "app/module";
import { ValidationPipe } from "@nestjs/common";
import config from "config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });

	app.setGlobalPrefix(config().globalPrefix);
	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	const swaggerConfig = new DocumentBuilder()
		.setTitle("Galleree")
		.setDescription("API for Galleree")
		.setVersion(process.version)
		.build();
	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup(`${config().globalPrefix}/spec`, app, document);

	await app.listen(config().port);
}
bootstrap();
