import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './users.service';
import { UserController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User], 'base1')],  // Asegurarte de que el repositorio esté importado
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],  // Exportar UserService para que otros módulos puedan usarlo
})
export class UserModule {}
