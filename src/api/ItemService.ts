import ApiClient from './ApiClient.ts';
import { ItemDTO } from '@/api/dto';

export class ItemService {
  async fetchAllItems(): Promise<ItemDTO[] | undefined> {
    try {
      const response = await ApiClient.get('/items');

      if (response && response.status === 200) {
        return response.data as ItemDTO[];
      }
    } catch (e) {
      console.error(e);
    }
  }
}
