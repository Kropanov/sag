import { Item } from '@core/Entities';

export interface HoverInfo {
  targetItem: Item;
  cursorX: number;
  cursorY: number;
}
