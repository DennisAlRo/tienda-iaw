import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { CartProduct } from '../cart-product/entities/cart-product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart, 'base1') private cartRepository: Repository<Cart>,
    @InjectRepository(Product, 'base1') private productRepository: Repository<Product>,
    @InjectRepository(CartProduct, 'base1') private cartProductRepository: Repository<CartProduct>,
  ) {}

  async create(createCartDto: CreateCartDto) {
    const newCart = this.cartRepository.create({
      user: { id: createCartDto.userId } as User,
      preciototal: createCartDto.preciototal,
    });
    return this.cartRepository.save(newCart);
  }

  async createCartIfNotExists(userId: number) {
    let cart = await this.cartRepository.findOne({ where: { user: { id: userId } } });

    if (!cart) {
      cart = this.cartRepository.create({
        user: { id: userId } as User,
        preciototal: 0,
      });
      await this.cartRepository.save(cart);
    }
    return cart;
  }

  async getCartByUserId(userId: number) {
    return this.cartRepository.findOne({ where: { user: { id: userId } }, relations: ['user'] });
  }

  async addProductToCart(cartId: number, productId: number, quantity: number = 1) {
    const cart = await this.cartRepository.findOne({ where: { id: cartId } });
    const product = await this.productRepository.findOne({ where: { id: productId } });

    if (!cart || !product) {
      throw new Error('Carrito o producto no encontrado');
    }

    const cartProduct = this.cartProductRepository.create({
      cart,
      product,
      cantidad: quantity,
    });

    return this.cartProductRepository.save(cartProduct);
  }

  findAll() {
    return this.cartRepository.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return this.cartRepository.findOne({ where: { id }, relations: ['user'] });
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return this.cartRepository.update(id, updateCartDto);
  }

  remove(id: number) {
    return this.cartRepository.delete(id);
  }
}
