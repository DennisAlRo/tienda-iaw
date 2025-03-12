import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { CartModule } from '../cart/cart.module';  // Importamos el CartModule para usar el servicio de carrito

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key',  // Usa el mismo secreto en jwt.strategy.ts
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,  // Importamos el UserModule para poder acceder a los usuarios
    CartModule,  // Importamos el CartModule para poder usar CartService en AuthService
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],  // Exporta AuthService para que pueda ser usado en otros módulos
})
export class AuthModule {}
