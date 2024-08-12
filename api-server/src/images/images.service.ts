import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { Repository } from 'typeorm';
import { Group } from 'src/groups/group.entity';
import { MyLogger } from '../logger/logger.service';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imageRepo: Repository<Image>,
    @InjectRepository(Group)
    private groupRepo: Repository<Group>,
    private myLogger: MyLogger,
  ) {
    this.myLogger.setContext(ImagesService.name);
  }

  async getInitImages() {
    const initImageGroup = await this.groupRepo.findBy({ id: 4 });
    const imagesStoreInfo = await this.imageRepo.findBy({
      group: initImageGroup,
    });
    return imagesStoreInfo;
  }
}
