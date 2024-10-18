import { ItemRarity } from '@/types/item-rarity.enum.ts';

export const ITEM_RARITY_COLORS: { [type in ItemRarity]: string } = {
  [ItemRarity.Common]: '#CCCCCC',
  [ItemRarity.Uncommon]: '#3399FF',
  [ItemRarity.Rare]: '#228B22',
  [ItemRarity.Epic]: '#800080',
  [ItemRarity.Legendary]: '#FFD700',
  [ItemRarity.Unique]: '#FF8C00',
};
