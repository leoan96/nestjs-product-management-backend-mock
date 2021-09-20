import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getProducts(): Promise<ProductDto[]> {
    return this.appService.getProducts();
  }

  @Get(':productCode')
  @HttpCode(HttpStatus.OK)
  async getProductDetails(@Param() code): Promise<ProductDto> {
    return this.appService.getProductDetails(code.productCode);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addProduct(@Body() createProductDto: CreateProductDto): Promise<void> {
    await this.appService.addProduct(createProductDto);
  }

  @Put(':productCode')
  @HttpCode(HttpStatus.OK)
  async updateProductDetails(
    @Param() code,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductDto> {
    return this.appService.updateProductDetails(
      code.productCode,
      updateProductDto,
    );
  }
}
