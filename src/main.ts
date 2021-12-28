import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';
import { mongoDbConnectionString, PORT } from './config';
import { ValidationPipeOptions } from './common/validation/validation.pipe';
import { Request, Response } from 'express';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.useGlobalPipes(new ValidationPipe(new ValidationPipeOptions()));
    app.enableCors({
        origin: '*',
    });

    //API Documentation - Swagger Settings
    const config = new DocumentBuilder()
        .setTitle('Search Service Documentation')
        .setVersion('1.0')
        .addTag('search')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(PORT);
    /*
    app.get('*', (req:Request, res:Response):Response =>( {
      res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    );
    */
}
bootstrap();

const connectToTheDatabase = async () => {
    try {
        await mongoose
            .connect(mongoDbConnectionString, {})
            .then((res) => {})
            .catch((err) => {
                console.log(err);
            });
    } catch (error) {
        console.log(error);
    }
};

connectToTheDatabase().then().catch();
