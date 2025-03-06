import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartProduct } from './entities/cart-product.entity';
import { CreateCartProductDto } from './dto/create-cart-product.dto';
import { Cart } from '../cart/entities/cart.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class CartProductService {
  constructor(@InjectRepository(CartProduct, 'base1') private cartProductRepository: Repository<CartProduct>) {}

  create(createCartProductDto: CreateCartProductDto) {
    const newCartProduct = this.cartProductRepository.create({
      cart: { id: createCartProductDto.cartId } as Cart,
      product: { id: createCartProductDto.productId } as Product,
      cantidad: createCartProductDto.cantidad,
    });
    return this.cartProductRepository.save(newCartProduct);
  }

  findAll() {
    return this.cartProductRepository.find({ relations: ['cart', 'product'] });
  }
}
