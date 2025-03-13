import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductModule } from '../products/products.module';
import { CartProduct } from '../cart-product/entities/cart-product.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartProduct, Product], 'base1'), // Asegúrate de incluir CartProduct aquí
    ProductModule, // Ya que necesitas el repositorio de Product también
  ],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
