import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get()
  async getProducts() {
    return this.appService.getProducts();
  }

  @Get(':productCode')
  async getProductDetails(@Param() code) {
    return this.appService.getProductDetails(code.productCode);
  }

  @Put(':productCode')
  async updateProductDetails(@Param() code, @Body() updatedProductDetails) {
    return this.appService.updateProductDetails(
      code.productCode,
      updatedProductDetails,
    );
  }

  @Post()
  async addProduct(@Body() body) {
    await this.appService.addProduct(body);
  }
}
