import YAML from 'yaml';
import axios from 'axios';
import { ItemTemplate } from '@/types';

export class ItemFactory {
  private itemTemplates: ItemTemplate[] | [] = [];

  public async loadItemTemplates() {
    const response = await axios.get('items.yml');

    if (response && response.headers && response.headers['content-type'] === 'text/yaml') {
      const data = YAML.parse(response.data);
      this.setItemTemplates(data.items);
    }
  }

  private setItemTemplates(itemTemplates: ItemTemplate[]) {
    this.itemTemplates = itemTemplates;
  }

  public getItemTemplates(): ItemTemplate[] {
    return [...this.itemTemplates];
  }

  public createItemById(_itemId: number) {}

  public generateItemsForVendor() {}
}
