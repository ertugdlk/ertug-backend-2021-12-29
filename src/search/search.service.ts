import { Injectable, NotFoundException } from '@nestjs/common';
import * as _ from 'lodash';
import { SearchPaginationDto } from './dtos/search.dto';
import { GarmentRepository } from './models/garment/garment.repository';

@Injectable()
export class SearchService {
    async getSearchDataWithPagination(req_data: SearchPaginationDto) {
        const data =
            await GarmentRepository.searchRelevantResultsWithPagination(
                req_data.text,
                req_data.page,
            );
        return data;
    }
}
