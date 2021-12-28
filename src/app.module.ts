import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';

@Module({
    imports: [
        SearchModule,
        ThrottlerModule.forRoot({
            ttl: 1,
            limit: 50,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
