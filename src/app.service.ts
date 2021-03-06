import { Injectable } from '@nestjs/common';
import { DATA_JSON_PATH } from './constants/product.constant';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  promisifyWriteFile,
  readProductData,
} from './helper/app/service.helper';

@Injectable()
export class AppService {
  async getProducts(): Promise<ProductDto[]> {
    return readProductData();
  }

  async getProductDetails(code: string): Promise<ProductDto> {
    const dataObj = await readProductData();
    const details = dataObj.filter((product) => product.product_code === code);
    return details[0];
  }

  async addProduct(productDetails: CreateProductDto): Promise<void> {
    const dataObj = await readProductData();
    let products = dataObj;
    products = [...products, productDetails];

    const data = JSON.stringify(products);
    await promisifyWriteFile(DATA_JSON_PATH, data);
  }

  async updateProductDetails(code: string, updatedDetails: UpdateProductDto) {
    const dataObj = await readProductData();
    const details = dataObj.map((product) => {
      if (product.product_code === code) {
        return { ...product, ...updatedDetails };
      }
      return product;
    });
    const data = JSON.stringify(details);
    await promisifyWriteFile(DATA_JSON_PATH, data);
    return details[0];
  }

  async deleteProduct(code: string): Promise<void> {
    const dataObj = await readProductData();
    const details = dataObj.filter((product) => product.product_code !== code);
    const data = JSON.stringify(details);
    await promisifyWriteFile(DATA_JSON_PATH, data);
  }
}
