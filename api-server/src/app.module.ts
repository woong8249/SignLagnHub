import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignsModule } from './signs/signs.module';
import { DefinitionsModule } from './definitions/definitions.module';
import { Groups } from './groups/groups.module';
import { ImagesModule } from './images/images.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { UsersModule } from './users/users.module';
import { configModule } from './config/config.module';
import { DatabasesModule } from './databases/databases.module';

@Module({
  imports: [
    configModule,
    DatabasesModule,
    SignsModule,
    DefinitionsModule,
    Groups,
    ImagesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
