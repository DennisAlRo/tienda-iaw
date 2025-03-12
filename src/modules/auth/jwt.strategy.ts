import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { UserService } from '../users/users.service';
import { JwtPayload } from './jwt.payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {  // 🔹 Agregamos el nombre 'jwt'
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your-secret-key',  // 🔹 Ahora coincide con AuthModule
    });
  }

  async validate(payload: JwtPayload) {
    const { sub } = payload;
    return await this.userService.findOne(sub);  // Retorna el usuario autenticado
  }
}
