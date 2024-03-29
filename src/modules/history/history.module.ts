import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

@Module({
  providers: [HistoryService],
  controllers: [HistoryController],
})
export class HistoryModule {}
