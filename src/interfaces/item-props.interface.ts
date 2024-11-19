import { ItemRarity, ItemType } from '@/enums';

export interface ItemProps {
  name?: string;
  cost?: number;
  asset?: string;
  type?: ItemType;
  amount?: number;
  history?: string;
  spriteId?: string;
  rarity?: ItemRarity;
  description?: string;
}
