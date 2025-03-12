import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CartService {
  constructor(@InjectRepository(Cart, 'base1') private cartRepository: Repository<Cart>) {}

  async create(createCartDto: CreateCartDto) {
    const newCart = this.cartRepository.create({
      user: { id: createCartDto.userId } as User,  // Aquí asignamos el usuario utilizando el ID
      preciototal: createCartDto.preciototal,
    });
    return this.cartRepository.save(newCart);
  }

  async createCartIfNotExists(userId: number) {
    const existingCart = await this.cartRepository.findOne({ where: { user: { id: userId } } });

    if (!existingCart) {
      const newCart = this.cartRepository.create({
        user: { id: userId } as User,  // Aseguramos que user se asigna correctamente
        preciototal: 0,  // Precio inicial en 0
      });
      await this.cartRepository.save(newCart);
    }
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
