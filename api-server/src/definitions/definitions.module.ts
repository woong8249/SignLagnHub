import { Module } from '@nestjs/common';
import { DefinitionsService } from './definitions.service';
import { DefinitionsController } from './definitions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Definition } from './definition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Definition])],
  providers: [DefinitionsService],
  controllers: [DefinitionsController],
})
export class DefinitionsModule {}
