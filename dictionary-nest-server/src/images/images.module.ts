import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { Group } from 'src/groups/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image, Group])],
  providers: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
