import { Item } from './Item';

export abstract class ItemStorage {
  abstract Open(): Array<Item>;
  abstract Add(item: Item): void;
  abstract Remove(item: Item): Item[] | undefined;
  abstract GetChild(index: number): Item;
}
