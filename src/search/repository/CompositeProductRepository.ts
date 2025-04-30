// src/search/repository/CompositeProductRepository.ts

import ProductGateway from '../gateways/ProductGateway';
import { Product } from '../entities/Product';

export default class CompositeProductRepository implements ProductGateway{
  constructor(
    private apiGateway: ProductGateway,
    private SQLiteGateway: ProductGateway
  ) {}

  async getProductByBarcode(barcode: string): Promise<Product | null> {
    const localResult = await this.SQLiteGateway.getProductByBarcode(barcode);
    if (localResult) return localResult;

    const apiResult = await this.apiGateway.getProductByBarcode(barcode);
    if (apiResult) await this.SQLiteGateway.saveProduct(apiResult);
    return apiResult;
  }

  async saveProduct(product: Product): Promise<void> {
    await this.SQLiteGateway.saveProduct(product);
  }
}
