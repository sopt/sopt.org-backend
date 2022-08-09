import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommonModule } from 'src/config/common.module';
import { ConfigurationModule } from 'src/config/config.module';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { LogoModule } from './modules/logo/logo.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [ConfigurationModule, PrismaModule, CommonModule, LogoModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
