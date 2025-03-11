import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service'; // Importar servicio de usuarios
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,  // Inyectar JwtService
  ) {}

  // Método para login y generar el JWT
  async login(loginDto: LoginDto) {
    // Verificar si el usuario existe y las credenciales son correctas
    const user = await this.userService.findByCredentials(loginDto.name, loginDto.password);

    if (!user) {
      throw new Error('Credenciales inválidas');  // Si el usuario no se encuentra
    }

    const payload = { name: user.name, sub: user.id };  // 'sub' es el ID del usuario
    const token = this.jwtService.sign(payload);  // Generar el JWT

    return { access_token: token };  // Retornar el token
  }
}
