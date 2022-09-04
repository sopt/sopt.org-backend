import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommonModule } from 'src/config/common.module';
import { ConfigurationModule } from 'src/config/config.module';
import { AppController } from './app.controller';
import { SemesterExistsRule } from './common/decorators/semester-exist.decorator';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { HistoryModule } from './modules/history/history.module';
import { LogoModule } from './modules/logo/logo.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [ConfigurationModule, PrismaModule, CommonModule, LogoModule, HistoryModule, UploadModule],
  controllers: [AppController],
  providers: [SemesterExistsRule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
