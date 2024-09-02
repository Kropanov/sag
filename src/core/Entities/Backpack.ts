import { Item, ItemStorage } from '.';

export class Backpack extends ItemStorage {
  private storage: Array<Item> = [];

  constructor() {
    super();
  }

  Open(): Array<Item> {
    return this.storage;
  }

  GetChild(index: number): Item {
    return this.storage[index];
  }

  Add(item: Item): void {
    this.storage.push(item);
  }

  Remove(item: Item): Item[] | undefined {
    if (!this.storage.includes(item)) {
      return;
    }

    const index = this.storage.indexOf(item);

    if (index === -1) {
      return;
    }

    return this.storage.splice(index, 1);
  }
}
