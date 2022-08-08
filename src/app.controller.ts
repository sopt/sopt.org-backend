import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import dayjs from 'dayjs';

@ApiTags('Server')
@Controller()
export class AppController {
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
