import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';  // DTO de login

@Controller('auth')  // Ruta base será '/auth'
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Ruta para login
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
