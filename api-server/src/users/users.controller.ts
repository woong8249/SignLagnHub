import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { Public } from 'src/auth/decorator/auth-public.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

const successfulMessage = { message: 'successful!' };
const createUserAPI201Response = {
  status: 201,
  description: 'successful!.',
  schema: { example: successfulMessage },
};
const createUserAPI400Response = {
  status: 400,
  description: 'invalid body',
  schema: {
    example: {
      message: ['name must be a string'],
      error: 'Bad Request',
      statusCode: 400,
    },
  },
};
const createUserAPI409Response = {
  status: 409,
  description: 'Conflict',
  schema: {
    example: {
      message: 'The email already exists.',
      error: 'Conflict',
      statusCode: 409,
    },
  },
};

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @ApiResponse(createUserAPI400Response)
  @ApiResponse(createUserAPI409Response)
  @ApiResponse(createUserAPI201Response)
  @ApiOperation({ summary: 'join the membership' })
  @Public()
  @Post()
  async createUser(@Body(new ValidationPipe()) dto: CreateUserDTO) {
    const result = await this.usersService.createUser(dto);
    if (result) {
      return { message: 'successful!' };
    }
  }
}
