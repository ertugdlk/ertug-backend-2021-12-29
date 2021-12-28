import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import { INestApplication } from '@nestjs/common';
import { SearchController } from '../search.controller';
import { SearchModule } from '../search.module';
import { SearchService } from '../search.service';
import { init_blackhat_data } from '../scripts/initTestData';
import { IGarment } from '../models/garment/garment.interfaces';
import { ResponseFormat } from 'src/common/interceptors/transfrom.interceptor';
import { GarmentRepository } from '../models/garment/garment.repository';

const mongod = new MongoMemoryServer();

describe('Search Service E2E Tests', () => {
    var app: INestApplication;
    const baseUrl = '/search';
    const keyword = 'black%20hat';

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                SearchModule,
                MongooseModule.forRootAsync({
                    useFactory: async () => {
                        const uri = await mongod.getUri();
                        return {
                            uri: uri,
                        };
                    },
                }),
            ],
            controllers: [SearchController],
            providers: [SearchService],
        }).compile();

        app = moduleRef.createNestApplication();
        const uri = await mongod.getUri();
        await mongoose.connect(uri);
        await app.init();
        await init_blackhat_data();
    });

    it('GET /search/:text/page/:page', async () => {
        const response = await request(app.getHttpServer())
            .get('/search/black%20hat/page/0')
            .expect(200);
        const res_body: ResponseFormat<IGarment> = response.body;
        const res_data: Array<IGarment> = res_body.data;
        expect(res_data.length).toBe(10);
    });
});
