import { Product } from '../../search/entities/Product';
import { HistoryGateway } from '../gateway/HistoryGateway';
import SQLite from 'expo-sqlite';

export class SQLiteHistoryRepository implements HistoryGateway {
  private dbPromise: Promise<SQLite.SQLiteDatabase>;

  constructor(dbPromise: Promise<SQLite.SQLiteDatabase>) {
    this.dbPromise = dbPromise;
  }

  async getHistory(): Promise<Product[]> {
    const db = await this.dbPromise;
    const result = await db.getAllAsync(
      `SELECT p.* 
       FROM history h
       JOIN products p ON h.product_code = p.barcode
       ORDER BY h.created_at DESC`,
      []
    );
    return result as Product[];

  }

  async saveSearch(product: Product): Promise<void> {
    const db = await this.dbPromise;
    // Insert or replace the product in the Product table
    await db.runAsync(
      `INSERT OR REPLACE INTO products 
        (barcode, name, brand, nutriscore) 
       VALUES (?, ?, ?, ?)`,
      [
        product.barcode,
        product.name,
        product.brand,
        product.nutriscore,
      ]
    );
    await db.runAsync(
      `INSERT OR REPLACE INTO history (product_code, created_at) 
       VALUES (?, ?)`,
      [product.barcode, Date.now()]
    );
  }
}
