import { ItemProps } from '@/interfaces';
import { ItemRarity } from '@/types/item-rarity.enum';
import { ItemType } from '@/types/item-type.enum';
import { Sprite } from 'pixi.js';

export abstract class Item {
  name: string;
  cost: number;
  type: ItemType;
  sprite: Sprite;
  rarity: ItemRarity;
  description: string;

  constructor({
    cost = 0,
    name = '',
    asset = '',
    description = '',
    type = ItemType.Material,
    rarity = ItemRarity.Common,
  }: ItemProps) {
    this.name = name;
    this.type = type;
    this.cost = cost;
    this.rarity = rarity;
    this.description = description;
    this.sprite = Sprite.from(asset);
  }
}
