import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { MyLogger } from 'src/logger/logger.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadFileDTO } from './dto/upload-file.dto';

const fileInterceptOpt = {
  storage: diskStorage({
    destination: './uploads', // 파일을 저장할 디렉토리
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
      callback(null, filename);
    },
  }),
};

@ApiTags('videos')
@Controller('videos')
export class VideosController {
  constructor(private logger: MyLogger) {
    this.logger.setContext(VideosController.name);
  }
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'video to uploads',
    type: UploadFileDTO,
  })
  @ApiOperation({ summary: 'upload videos' })
  @UseInterceptors(FileInterceptor('file', fileInterceptOpt))
  @Post('upload')
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'File uploaded successfully',
      file,
    };
  }
}
