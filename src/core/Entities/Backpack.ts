import { Item, ItemStorage } from '@core/Entities';
import { BACKPACK_SLOT_INCREMENT, INITIAL_BACKPACK_CAPACITY } from '@config';

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
    const index = this.getIndex(null);
    this.insertAt(item, index);
  }

  public placeItem(item: Item, index: number): void {
    this.remove(item);
    this.insertAt(item, index);
  }

  public moveItemTo(item: Item, targetIndex: number): void {
    if (this.isPlaceAvailable(targetIndex)) {
      this.placeItem(item, targetIndex);
    } else {
      this.swapItems(item, targetIndex);
    }
  }

  public swapItems(item: Item, targetIndex: number): void {
    const existingItem = this.getChild(targetIndex);
    const originalIndex = this.getIndex(item);

    this.remove(item);

    if (this.itemIsNotNull(existingItem)) {
      this.placeItem(existingItem, originalIndex);
    }

    this.placeItem(item, targetIndex);
  }

  public insertAt(item: Item, index: number): void {
    this.storage[index] = item;
  }

  public isPlaceAvailable(index: number) {
    return this.storage[index] === null;
  }

  public remove(item: Item): Item | undefined | null {
    if (this.hasItem(item)) {
      const index = this.getIndex(item);
      const removedItem = this.storage[index];
      this.storage[index] = null;

      return removedItem;
    }
  }

  public getChild(index: number): Item | null {
    return this.storage[index];
  }

  public getIndex(item: Item | null) {
    return this.storage.indexOf(item);
  }

  public itemIsNotNull(item: Item | null) {
    return item !== null;
  }

  public increaseCapacity() {
    this.capacity += BACKPACK_SLOT_INCREMENT;
  }

  public hasItem(item: Item): boolean {
    return this.storage.includes(item);
  }
}
