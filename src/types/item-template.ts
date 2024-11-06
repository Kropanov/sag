import { ItemType } from '@/types/item-type.enum.ts';
import { ItemRarity } from '@/types/item-rarity.enum.ts';

export type ItemTemplate = {
  id: string;
  name: string;
  type: ItemType;
  cost: number;
  asset: string;
  rarity: ItemRarity;
  quantity: number;
  ability: string;
  cooldown: number;
  history: string;
  description: string;
  properties: {
    // TODO: implement properties type
    damageType: Array<string>;
  };
};
