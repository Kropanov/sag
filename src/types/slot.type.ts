import { Item } from '@core/Entities';
import { Graphics, Text } from 'pixi.js';

export type Slot = {
  item: Item | null;
  graphics: Graphics;
  text: Text | null;
};
