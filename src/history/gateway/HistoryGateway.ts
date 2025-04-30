// src/history/gateway/HistoryGateway.ts
import { Product } from '../../search/entities/Product';

export interface HistoryGateway {
  saveSearch( product : Product): Promise<void>;
  getHistory(): Promise<Product[]>;
}

