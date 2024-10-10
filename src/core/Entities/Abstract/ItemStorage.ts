import { Item } from './Item';

export abstract class ItemStorage {
  abstract open(): Array<Item | null>;
  abstract push(item: Item): void;
  abstract insertAt(item: Item, index: number): void;
  abstract remove(item: Item): Item | null | undefined;
  abstract getChild(index: number): Item | null;
  abstract increaseCapacity(): void;
  abstract hasItem(item: Item): boolean;
  abstract isPlaceAvailable(index: number): boolean;
  abstract moveItemTo(item: Item, index: number): void;
  abstract swapItems(item: Item, targetIndex: number): void;
  abstract placeItem(item: Item, index: number): void;
  abstract getIndex(item: Item | null): number;
  abstract itemIsNotNull(item: Item): boolean;
}
