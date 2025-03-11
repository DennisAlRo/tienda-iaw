import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/users/users.module';
import { ProductModule } from './modules/products/products.module';
import { CartModule } from './modules/cart/cart.module';
import { CartProductModule } from './modules/cart-product/cart-product.module';
import { AuthModule } from './modules/auth/auth.module'; // Agregar AuthModule

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      name: 'base1', 
      type: 'mysql',
      host: process.env.URL,
      port: 3306,
      username: process.env.USUARIO,
      password: process.env.PASSWORD,
      database: process.env.DBNAME,
      autoLoadEntities: true, 
      synchronize: true, 
    }),

    UserModule,
    ProductModule,
    CartModule,
    CartProductModule,
    AuthModule,  // Agregar AuthModule a la lista de imports
  ],
})
export class AppModule {}
