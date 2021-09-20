import { promisify } from 'util';
import * as fs from 'fs';
import { DATA_JSON_PATH } from 'src/constants/product.constant';
import { ProductDto } from 'src/dto/product.dto';

export const readProductData = async (): Promise<ProductDto[]> => {
  const promisifyReadFile = promisify(fs.readFile);
  const products = JSON.parse(
    await promisifyReadFile(DATA_JSON_PATH, {
      encoding: 'utf-8',
    }),
  );
  return products;
};
