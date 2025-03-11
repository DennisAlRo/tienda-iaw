import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, 'base1') private userRepository: Repository<User>,
  ) {}

  // Crear un nuevo usuario
  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  // Verificar si las credenciales son correctas (nombre y contraseña)
  async findByCredentials(name: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { name, password },  // Busca un usuario que coincida con el nombre y la contraseña
    });
    return user;  // Retorna el usuario si existe o null si no lo encuentra
  }

  // Buscar un usuario por su nombre (usado en el JWT para validación)
  async findOneByName(name: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { name } });
  }

  // Obtener todos los usuarios
  findAll() {
    return this.userRepository.find();
  }

  // Obtener un usuario por su id
  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  // Actualizar la información de un usuario
  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  // Eliminar un usuario por su id
  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
