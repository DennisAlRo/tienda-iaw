import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AddProductDto } from './dto/add-product.dto';  // Importamos el DTO para añadir productos

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }

  // Nueva ruta para agregar un producto al carrito
  @Post(':cartId/add-product')
  addProductToCart(
    @Param('cartId') cartId: string,  // Obtén el cartId desde la URL
    @Body() addProductDto: AddProductDto,  // Recibe el DTO con productId y quantity
  ) {
    return this.cartService.addProductToCart(+cartId, addProductDto.productId, addProductDto.quantity);
  }
}
