import { ItemDTO } from '@dto';
import { ApiClient } from '@api';

export class ItemService {
  async fetchAllItems(): Promise<ItemDTO[] | undefined> {
    try {
      const response = await ApiClient.get('v1/items');

      if (response && response.status === 200) {
        return response.data as ItemDTO[];
      }
    } catch (e) {
      console.error(e);
    }
  }
}
