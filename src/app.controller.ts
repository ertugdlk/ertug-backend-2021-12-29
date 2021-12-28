import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import path from 'path';
import { PassThrough } from 'stream';
import * as fs from 'fs';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/')
    async getHello(@Res() res: Response) {
        /*
        const bufferIndexHtml = fs.readFileSync('index.html');
        res.type('text/html').send(bufferIndexHtml);
        
        //console.log(path.resolve(__dirname, '../client/build'));
        res.sendFile(
            '/Users/ertugdilek/Desktop/intelistyle/intelistyle_backend/build',
            'index.html',
        );
        */

        const bufferIndexHtml = fs.readFileSync(
            '/Users/ertugdilek/Desktop/intelistyle/intelistyle_backend/build/index.html',
        );
        res.type('text/html').send(bufferIndexHtml);
    }
}
