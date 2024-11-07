import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsString()
  public password: string;

  @ApiProperty()
  @IsString()
  public name: string;

  @ApiProperty()
  @IsString()
  location: string;
}
