import { Injectable } from '@nestjs/common';
import GarmentModel from './garment.model';

@Injectable()
export class GarmentRepository {
    static async searchRelevantResultsWithPagination(text: string, page) {
        const query_options = {
            skip: page * 10,
            limit: 10,
            sort: { score: { $meta: 'textScore' } },
        };

        const data = await GarmentModel.find(
            {
                $text: {
                    $search: text,
                },
            },
            { score: { $meta: 'textScore' } },
            query_options,
        );

        return data;
    }
}
