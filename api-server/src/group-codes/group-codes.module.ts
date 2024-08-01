import { Module } from '@nestjs/common';
import { GroupCodesService } from './group-codes.service';
import { GroupCodesController } from './group-codes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupCode } from './group-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GroupCode])],
  providers: [GroupCodesService],
  controllers: [GroupCodesController],
})
export class GroupCodesModule {}
