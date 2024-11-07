import { ApiProperty } from '@nestjs/swagger';
// not yet import {} from 'class-validator';

export class UploadFileDTO {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: BinaryData;
}
