import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/users.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key',  // Define una clave secreta segura
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,  // Importar el UsersModule
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
