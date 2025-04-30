import ProductGateway from "../gateways/ProductGateway";
import { Product } from "../entities/Product";
import SQLite from 'expo-sqlite';


export default class SQLiteProductRepository implements ProductGateway {
  private dbPromise: Promise<SQLite.SQLiteDatabase>;

  constructor(dbPromise: Promise<SQLite.SQLiteDatabase>) {
    this.dbPromise = dbPromise;
  }
  async getProductByBarcode(barcode: string): Promise<Product | null> {
    const db = await this.dbPromise;
    const result: Product | null = await db.getFirstAsync(
      `SELECT * FROM Product WHERE barcode = ?`,
      [barcode]
    );
    if (result) {
      return {
        barcode: result.barcode,
        name: result.name,
        brand: result.brand,
        nutriscore: result.nutriscore,
        // Add other fields as necessary
      } as Product;
    }
    return null;
  }

  async saveProduct(product: Product): Promise<void> {
    //don't save the product if already exists in DB, only updating the historic but this is done in the History Repo
    return
  }
}
