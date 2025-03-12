import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // Nueva ruta para obtener el usuario autenticado
  @UseGuards(JwtAuthGuard)  // Protege la ruta con JWT
  @Get('me')
  getProfile(@Req() req) {
    return req.user; // Devuelve los datos del usuario autenticado
  }
}
