import { Module } from '@nestjs/common';
import { LogosController } from './logos.controller';
import { LogosService } from './logos.service';

@Module({
  providers: [LogosService],
  controllers: [LogosController],
})
export class LogosModule {}
