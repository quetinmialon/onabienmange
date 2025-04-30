import { Product } from '../../search/entities/Product';
import { HistoryGateway } from '../gateway/HistoryGateway';

export class HistoryService {
  constructor(private historyRepo: HistoryGateway) {}

  async getHistory(): Promise<Product[]> {
    return await this.historyRepo.getHistory();
  }
  async saveSearch(product: Product): Promise<void> {
    await this.historyRepo.saveSearch(product);
  }
}
