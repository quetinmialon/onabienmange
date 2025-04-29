import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const product = sqliteTable('product', {
  barcode: text('barcode').primaryKey(),
  name: text('name').notNull(),
  brand: text('brand'),
  nutriscore: text('nutriscore'),});

export type Product = {
    barcode: string;
    name: string;
    brand: string;
    nutriscore: string;
};