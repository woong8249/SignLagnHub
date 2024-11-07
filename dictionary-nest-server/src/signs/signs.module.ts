import { Module } from '@nestjs/common';
import { SignsService } from './signs.service';
import { SignsController } from './signs.controller';
import { Sign } from './sign.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Sign])],
  providers: [SignsService],
  controllers: [SignsController],
})
export class SignsModule {}
