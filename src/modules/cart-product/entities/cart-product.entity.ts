import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from 'src/modules/products/entities/product.entity';
import { Cart } from 'src/modules/cart/entities/cart.entity';

@Entity()
export class CartProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.id)
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @Column()
  cantidad: number;
}
