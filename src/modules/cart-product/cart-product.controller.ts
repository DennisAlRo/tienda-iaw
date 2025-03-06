import { Controller, Get, Post, Body } from '@nestjs/common';
import { CartProductService } from './cart-product.service';
import { CreateCartProductDto } from './dto/create-cart-product.dto';

@Controller('cart-products')
export class CartProductController {
  constructor(private readonly cartProductService: CartProductService) {}

  @Post()
  create(@Body() createCartProductDto: CreateCartProductDto) {
    return this.cartProductService.create(createCartProductDto);
  }

  @Get()
  findAll() {
    return this.cartProductService.findAll();
  }
}
