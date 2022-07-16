import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import dayjs from 'dayjs';

@ApiTags('Server')
@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  home(): string {
    const nowDate = dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]');
    console.log(`API Home - ${nowDate}`);
    return 'SOPT.ORG';
  }

  @Get('/health-check')
  healthCheck(): string {
    return 'ok';
  }
}
