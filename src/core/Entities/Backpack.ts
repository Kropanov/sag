import { Item, ItemStorage } from '.';

export class Backpack extends ItemStorage {
  private storage: Array<Item> = [];

  constructor() {
    super();
  }

  open(): Array<Item> {
    return this.storage;
  }

  getChild(index: number): Item {
    return this.storage[index];
  }

  add(item: Item): void {
    this.storage.push(item);
  }

  remove(item: Item): Item[] | undefined {
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
