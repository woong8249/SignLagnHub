import {
  Controller,
  Request,
  Post,
  UseGuards,
  Response,
  Get,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { IUser } from 'src/users/interfaces/user.interface';
import { Public } from './decorator/auth-public.decorator';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { User } from 'src/users/user.decorator';
import { LoginDTO } from './dto/login.dto';

const successfulMessage = { message: 'successful!' };
const fail401Message = {
  message: 'Unauthorized',
  statusCode: 401,
};
const loginAPI200Response = {
  status: 200,
  description: 'login successful!.',
  schema: { example: successfulMessage },
};
const loginAPI401Response = {
  status: 401,
  description: 'not valid email or password.',
  schema: {
    example: fail401Message,
  },
};
const logoutAPI200Response = {
  status: 200,
  description: 'test successful!.',
  schema: { example: successfulMessage },
};

const logoutAPI401Response = {
  status: 401,
  description: "If you don't have accessToken",
  schema: {
    example: fail401Message,
  },
};

const testAPI200Response = {
  status: 200,
  schema: { example: successfulMessage },
  description: 'test successful!.',
};
const testAPI401Response = {
  status: 401,
  schema: { example: fail401Message },
  description: 'not valid ',
};

const millisecondsPerDay = 24 * 60 * 60 * 1000;
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  cookieOption = {
    signed: true, // for integrity  req.signedCookie
    httpOnly: true, // for only access browser
    secure: true, // for HTTPS; may be ignored in local development or by tools like Postman
  };
  constructor(private authService: AuthService) {}
  @ApiResponse(loginAPI200Response)
  @ApiResponse(loginAPI401Response)
  @ApiBody({ type: LoginDTO })
  @ApiOperation({ summary: 'login' })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @User() user: IUser,
    @Request() req: ExpressRequest,
    @Response() res: ExpressResponse,
  ) {
    const accessToken = this.authService.createAccessToken(user);
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    if (!req.useragent.isMobile) {
      res.cookie('accessToken', accessToken, {
        ...this.cookieOption,
        expires: new Date(new Date().getTime() + millisecondsPerDay),
      });
    }
    res.status(200).json(successfulMessage);
  }

  @ApiBearerAuth()
  @ApiResponse(logoutAPI200Response)
  @ApiResponse(logoutAPI401Response)
  @ApiOperation({ summary: 'logout' })
  @Post('logout')
  async logout(@Response() res: ExpressResponse) {
    res.clearCookie('accessToken', this.cookieOption);
    res.status(200).json(successfulMessage);
  }

  @ApiBearerAuth()
  @ApiResponse(testAPI200Response)
  @ApiResponse(testAPI401Response)
  @ApiOperation({
    summary: 'for test',
    description:
      'Note for Swagger UI and Swagger Editor users: Cookie authentication is currently not supported for "try it out" requests due to browser security restrictions. See this issue for more information. SwaggerHub does not have this limitation.',
  })
  @Get('test')
  async test() {
    return successfulMessage;
  }
}
