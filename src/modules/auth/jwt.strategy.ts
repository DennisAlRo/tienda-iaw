import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { UserService } from '../users/users.service';
import { JwtPayload } from './jwt.payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey',  // Cambia esta clave por algo más seguro
    });
  }

  async validate(payload: JwtPayload) {
    const { sub } = payload;  // 'sub' es el ID del usuario
    return await this.userService.findOne(sub);  // Busca al usuario con el ID
  }
}
