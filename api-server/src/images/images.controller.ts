import { Controller, Get } from '@nestjs/common';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imageService: ImagesService) {}
  @Get('init')
  getInitImages() {
    return this.imageService.getInitImages();
  }
}
