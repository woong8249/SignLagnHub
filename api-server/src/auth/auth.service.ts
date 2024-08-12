import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/interfaces/user.interface';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<IUser | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _hashPassword, ...rest } = user;
      return rest;
    }
    return null;
  }

  createAccessToken(user: IUser) {
    const payload: IJwtPayload = { id: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
