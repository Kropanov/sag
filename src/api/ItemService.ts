import ApiClient from './ApiClient.ts';

export class ItemService {
  async fetchAllItems() {
    return ApiClient.get('/items');
  }
}
