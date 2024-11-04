import YAML from 'yaml';
import axios from 'axios';

export class ItemFactory {
  itemsData = undefined;

  constructor() {
    this.itemsData = undefined;
  }

  public async loadItemsData() {
    // TODO: create a check on yaml type
    const response = await axios.get('items.yml');
    this.itemsData = YAML.parse(response.data);
    console.log('Parsed YAML data:', this.itemsData);
  }

  public createItemById(_itemId: number) {}

  public generateItemsForVendor() {}
}
