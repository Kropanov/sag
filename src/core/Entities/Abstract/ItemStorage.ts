import { Item } from './Item';

export abstract class ItemStorage {
  abstract open(): Array<Item | null>;
  abstract add(item: Item): void;
  abstract remove(item: Item): Item | null | undefined;
  abstract getChild(index: number): Item | null;
  abstract increaseCapacity(): void;
}
