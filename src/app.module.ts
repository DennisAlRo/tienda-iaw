import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Importar los módulos de la aplicación
import { UserModule } from './modules/users/users.module';
import { ProductModule } from './modules/products/products.module';
import { CartModule } from './modules/cart/cart.module';
import { CartProductModule } from './modules/cart-product/cart-product.module';

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
  ],
})
export class AppModule {}
