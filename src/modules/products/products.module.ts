import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product], 'base1'), // Importa la entidad correctamente
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [TypeOrmModule], // Exportar TypeOrmModule para otros módulos que lo necesiten
})
export class ProductModule {}
