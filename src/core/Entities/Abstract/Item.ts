import { ItemProps } from '@/interfaces';
import { ItemRarity, ItemType } from '@/enums';
import { Sprite } from 'pixi.js';

export abstract class Item {
  name: string;
  cost: number;
  type: ItemType;
  sprite: Sprite;
  amount: number;
  spriteId: string;
  rarity: ItemRarity;
  description: string;
  history: string;

  constructor({
    cost = 0,
    name = '',
    asset = '',
    amount = 1,
    history = '',
    description = '',
    type = ItemType.Material,
    rarity = ItemRarity.Common,
  }: ItemProps) {
    this.name = name;
    this.type = type;
    this.cost = cost;
    this.amount = amount;
    this.rarity = rarity;
    this.history = history;
    this.description = description;
    this.spriteId = asset;
    this.sprite = Sprite.from(asset);
    this.sprite.interactive = true;
    this.sprite.eventMode = 'static';
  }
}
