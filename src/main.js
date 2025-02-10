"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const host = process.env.HOST || 'localhost';
    const port = process.env.PORT || 3000;
    const config = new swagger_1.DocumentBuilder()
        .setTitle('My API')
        .setDescription('API Documentation')
        .setVersion('1.0')
        .addTag('bot-constructor')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(port, host);
    console.log(`Server is running on: http://${host}:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map