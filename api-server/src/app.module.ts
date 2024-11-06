import { Module } from '@nestjs/common';
import { SignsModule } from './signs/signs.module';
import { DefinitionsModule } from './definitions/definitions.module';
import { GroupsModule } from './groups/groups.module';
import { ImagesModule } from './images/images.module';
import { UsersModule } from './users/users.module';
import { DatabasesModule } from './database/databases.module';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './loggers/loggers.module';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    DatabasesModule,
    SignsModule,
    DefinitionsModule,
    GroupsModule,
    ImagesModule,
    UsersModule,
    VideosModule,
  ],
})
export class AppModule {}
