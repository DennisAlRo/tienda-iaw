import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './users.service';

@Controller('users') // Ruta para las operaciones de usuario
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Crear un nuevo usuario
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // Ruta para el login (verificación de credenciales)
  @Post('login')  // Ruta específica para login
  async login(@Body() body: { name: string; password: string }) {
    const { name, password } = body;
    const user = await this.userService.findByCredentials(name, password);

    if (!user) {
      return { message: 'Credenciales inválidas' };  // Si no se encuentra el usuario o la contraseña es incorrecta
    }

    return { message: 'Login exitoso' };  // Si el login es exitoso
  }

  // Otros métodos de gestión de usuarios (findAll, findOne, etc.)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
