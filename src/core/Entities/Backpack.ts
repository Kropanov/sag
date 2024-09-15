import { BACKPACK_SLOT_INCREMENT, INITIAL_BACKPACK_CAPACITY } from '@/config';
import { Item, ItemStorage } from '.';

export class Backpack extends ItemStorage {
  private storage: Array<Item | null> = [];
  private capacity: number = INITIAL_BACKPACK_CAPACITY;

  constructor() {
    super();
    this.#initializeStorage();
  }

  #initializeStorage() {
    for (let i = 0; i < this.capacity; i++) {
      this.storage.push(null);
    }
  }

  open(): Array<Item | null> {
    return this.storage;
  }

  add(item: Item): void {
    const index = this.storage.indexOf(null);
    this.storage[index] = item;
  }

  remove(item: Item): Item | undefined | null {
    if (!this.storage.includes(item)) {
      return;
    }

    const index = this.storage.indexOf(item);
    const removedItem = this.storage[index];
    this.storage[index] = null;

    return removedItem;
  }

  getChild(index: number): Item | null {
    return this.storage[index];
  }

  increaseCapacity() {
    this.capacity += BACKPACK_SLOT_INCREMENT;
  }
}
