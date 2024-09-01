import { Item, ItemStorage } from '.';

export class Backpack extends ItemStorage {
  Open(): void {
    throw new Error('Method not implemented.');
  }

  Add(_item: Item): void {
    throw new Error('Method not implemented.');
  }

  Remove(item: Item): Item {
    return item;
  }

  GetChild(_index: number): Item {
    throw new Error('Method not implemented.');
  }
}
