import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProduct } from './entities/cart-product.entity';
import { CartProductService } from './cart-product.service';
import { CartProductController } from './cart-product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CartProduct], 'base1')],
  providers: [CartProductService],
  controllers: [CartProductController],
  exports: [TypeOrmModule],
})
export class CartProductModule {}
