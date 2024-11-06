import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { Request } from 'express';

function extractJwtFromCookie(cookieName: string) {
  return (req: Request): string | null => {
    return req && req.signedCookies ? req.signedCookies[cookieName] : null;
  };
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        extractJwtFromCookie('accessToken'),
      ]),
      secretOrKey: config.get('jwt.secret'),
      ignoreExpiration: false, // Confirm Expiration by Passport
    });
  }

  async validate(payload: IJwtPayload | undefined) {
    // can
    // 1. query to extract more information about the user
    // 2. check more if this token is revoked
    return { id: payload.id, email: payload.email };
  }
}
