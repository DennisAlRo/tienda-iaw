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

  create(createCartDto: CreateCartDto) {
    const newCart = this.cartRepository.create({
      user: { id: createCartDto.userId } as User,
      preciototal: createCartDto.preciototal,
    });
    return this.cartRepository.save(newCart);
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
