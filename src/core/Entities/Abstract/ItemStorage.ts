import { Item } from './Item';

export abstract class ItemStorage {
  abstract Open(): void;
  abstract Add(item: Item): void;
  abstract Remove(item: Item): Item;
  abstract GetChild(index: number): Item;
}
