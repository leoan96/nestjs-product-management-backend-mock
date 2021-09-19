import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promisify } from 'util';

@Injectable()
export class AppService {
  // getHello(): string {
  //   return 'Hello World!';
  // }

  private async readProductData() {
    const promisifyReadFile = promisify(fs.readFile);
    const products = JSON.parse(
      await promisifyReadFile(
        '/Users/leoloh/Desktop/lizard/onboarding /antd-backend/data.json',
        {
          encoding: 'utf-8',
        },
      ),
    );
    return products;
  }

  async getProducts() {
    return this.readProductData();
  }

  async getProductDetails(code) {
    const dataObj = await this.readProductData();
    const details = dataObj.filter((product) => product.product_code === code);
    return details;
  }

  async updateProductDetails(code, updatedDetails) {
    const dataObj = await this.readProductData();
    const details = dataObj.map((product) => {
      if (product.product_code === code) {
        return { ...product, ...updatedDetails };
      }
      return product;
    });
    const promisifyWriteFile = promisify(fs.writeFile);
    const data = JSON.stringify(details);
    await promisifyWriteFile(
      '/Users/leoloh/Desktop/antd-backend/data.json',
      data,
    );
    return details;
  }

  async addProduct(productDetails) {
    const promisifyWriteFile = promisify(fs.writeFile);
    const dataObj = await this.readProductData();
    let products = dataObj;
    products = [...products, productDetails];

    const data = JSON.stringify(products);
    await promisifyWriteFile(
      '/Users/leoloh/Desktop/antd-backend/data.json',
      data,
    );
  }
}
