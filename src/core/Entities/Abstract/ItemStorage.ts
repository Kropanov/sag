import { Item } from './Item';

export abstract class ItemStorage {
  abstract open(): Array<Item>;
  abstract add(item: Item): void;
  abstract remove(item: Item): Item[] | undefined;
  abstract getChild(index: number): Item;
}
