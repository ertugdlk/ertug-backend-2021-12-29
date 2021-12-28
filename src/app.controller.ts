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
    async getHello(@Res() res: Response) {}
}
