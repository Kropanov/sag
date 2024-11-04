import YAML from 'yaml';
import axios from 'axios';

export class ItemFactory {
  itemsData = undefined;

  constructor() {
    this.itemsData = undefined;
  }

  public async loadItemsData() {
    // TODO: create a check on yaml type
    // TODO: create API client to avoid using axios in different places of the project
    const response = await axios.get('/dev/items.yml');
    this.itemsData = YAML.parse(response.data);
    console.log('Parsed YAML data:', this.itemsData);
  }

  public createItemById(_itemId: number) {}

  public generateItemsForVendor() {}
}
