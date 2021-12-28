import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { GarmentRepository } from '../models/garment/garment.repository';
import { init_blackhat_data } from '../scripts/initTestData';
import { IGarment } from '../models/garment/garment.interfaces';
import { IGarmentDocument } from '../models/garment/garment.model';

const mongod = new MongoMemoryServer();

describe('Search Service E2E Tests', () => {
    beforeAll(async () => {
        const uri = await mongod.getUri();
        await mongoose.connect(uri);
        await init_blackhat_data();
    });

    it('Garment Repository searchRelevantResultsWithPagination', async () => {
        const results =
            await GarmentRepository.searchRelevantResultsWithPagination(
                'black hat',
                0,
            );
        const index_0: IGarment = results[0].toJSON();
        //results need to be 10 length
        expect(results.length).toBe(10);
        //result field need to be exist
        expect(index_0.score).toBeDefined();
        //results need to be listed by score
        expect(index_0.score).toBeGreaterThanOrEqual(
            results[1].toJSON()['score'],
        );
        //page 1 need to have 10 length and lower scores
        const results_1 =
            await GarmentRepository.searchRelevantResultsWithPagination(
                'black hat',
                1,
            );
        expect(results_1.length).toBe(10);
        for (var i; i < results_1.length; i++) {
            const index_obj: IGarment = results_1[i].toJSON();
            expect(results[9].toJSON()['score']).toBeGreaterThanOrEqual(
                index_obj.score,
            );
        }
    });
});
