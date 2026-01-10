import { Injectable } from "@nestjs/common";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from "express";
import { jwtConstants } from "@/modules/auth/constants/jwt.constants";
import { JwtUserPayload } from "@/modules/auth/auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.access_token,
      ]),
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtUserPayload): Promise<JwtUserPayload> {
    return {
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
      firstname: payload.firstname
    };
  }
}