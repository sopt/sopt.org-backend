import { Module } from '@nestjs/common';
import { LogoController } from './logo.controller';
import { LogoService } from './logo.service';

@Module({
  providers: [LogoService],
  controllers: [LogoController],
})
export class LogoModule {}
