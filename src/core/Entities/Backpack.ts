import { BACKPACK_SLOT_INCREMENT, INITIAL_BACKPACK_CAPACITY } from '@/config';
import { Item, ItemStorage } from '.';

export class Backpack extends ItemStorage {
  private storage: Array<Item | null> = [];
  private capacity: number = INITIAL_BACKPACK_CAPACITY;

  constructor() {
    super();
    this.initializeStorage();
  }

  private initializeStorage() {
    for (let i = 0; i < this.capacity; i++) {
      this.storage.push(null);
    }
  }

  public open(): Array<Item | null> {
    return this.storage;
  }

  public push(item: Item): void {
    const index = this.storage.indexOf(null);
    this.insertAt(item, index);
  }

  public moveItemTo(item: Item, index: number): void {
    if (this.hasItem(item) && this.isPlaceAvailable(index)) {
      this.remove(item);
      this.insertAt(item, index);
    }
  }

  public insertAt(item: Item, index: number): void {
    this.storage[index] = item;
  }

  public isPlaceAvailable(index: number) {
    return this.storage[index] === null;
  }

  public remove(item: Item): Item | undefined | null {
    if (this.hasItem(item)) {
      const index = this.storage.indexOf(item);
      const removedItem = this.storage[index];
      this.storage[index] = null;

      return removedItem;
    }
  }

  public getChild(index: number): Item | null {
    return this.storage[index];
  }

  public increaseCapacity() {
    this.capacity += BACKPACK_SLOT_INCREMENT;
  }

  public hasItem(item: Item): boolean {
    return this.storage.includes(item);
  }
}
