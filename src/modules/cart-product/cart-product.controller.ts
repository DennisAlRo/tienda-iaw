import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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

  // Nueva ruta para obtener los productos del carrito y el total
  @Get(':cartId/products')
  async getCartProducts(@Param('cartId') cartId: number) {
    const cartProducts = await this.cartProductService.getCartProducts(cartId);
    const total = cartProducts.reduce(
      (acc, item) => acc + item.product.precio * item.cantidad,
      0
    );
    return { cartProducts, total }; // Devolvemos los productos del carrito y el total calculado
  }
}
