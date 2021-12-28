import { Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
    NotFoundSwaggerSchema,
    BadRequestSwaggerSchema,
    ForbiddenSwaggerSchema,
} from '../common/exception-filters/http-exception.filter';
import {
    ResponseFormat,
    ResponseFormatDto,
    TransformInterceptor,
} from '../common/interceptors/transfrom.interceptor';
import { SearchPaginationDto } from './dtos/search.dto';
import { IGarment } from './models/garment/garment.interfaces';
import { SearchService } from './search.service';

@ApiResponse({ status: 404, schema: NotFoundSwaggerSchema })
@ApiResponse({
    status: 400,
    schema: BadRequestSwaggerSchema,
})
@ApiResponse({
    status: 403,
    schema: ForbiddenSwaggerSchema,
})
@UseInterceptors(TransformInterceptor)
@ApiTags('search')
@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @ApiResponse({ status: 200, type: ResponseFormatDto })
    @Get(':text/page/:page')
    async getWithPagination(
        @Param('page') page: number,
        @Param('text') text: string,
    ): Promise<Array<IGarment>> {
        try {
            const req: SearchPaginationDto = { text, page };
            const data = await this.searchService.getSearchDataWithPagination(
                req,
            );
            return data;
        } catch (error) {
            throw error;
        }
    }
}
