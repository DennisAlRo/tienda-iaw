import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cart], 'base1')],
  providers: [CartService],
  controllers: [CartController],
  exports: [TypeOrmModule],
})
export class CartModule {}
