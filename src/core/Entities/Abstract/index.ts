export abstract class Item {}

export abstract class ItemStorage {
  Open() {}
  Add(_item: Item) {}
  Remove(_item: Item) {}
  GetChild(_index: number) {}
}
