import { ItemProps } from '@/interfaces';
import { ItemRarity } from '@/types/item-rarity.enum';
import { Sprite } from 'pixi.js';

export abstract class Item {
  name: string;
  cost: number;
  sprite: Sprite;
  rarity: ItemRarity;
  description: string;

  constructor({ asset = '', cost = 0, description = '', name = '', rarity = ItemRarity.Common }: ItemProps) {
    this.cost = cost;
    this.name = name;
    this.rarity = rarity;
    this.description = description;
    this.sprite = Sprite.from(asset);
  }
}
