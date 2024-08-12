import { Controller, Get } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorator/auth-public.decorator';

const getInitImages200Res = {
  status: 200,
  description: 'successful!.',
};

@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imageService: ImagesService) {}

  @ApiResponse(getInitImages200Res)
  @ApiOperation({ summary: 'Initial image required for loading' })
  @Public()
  @Get('init')
  getInitImages() {
    return this.imageService.getInitImages();
  }
}
