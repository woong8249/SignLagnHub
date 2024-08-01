import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('typeorm.host'), // .env 파일에서 설정된 값 사용
        port: configService.get<number>('typeorm.port'),
        username: configService.get<string>('typeorm.username'),
        password: configService.get<string>('typeorm.password'),
        database: configService.get<string>('typeorm.database'),
        synchronize: true,
        logging: true,
        autoLoadEntities: true,
      }),
    }),
  ],
  exports: [DatabasesModule],
})
export class DatabasesModule {}
