import { Item } from '@/core/Entities';
import { Graphics } from 'pixi.js';

export type vCollisionNormType = {
  x: number;
  y: number;
};

export type MenuItemsType = {
  text: string;
  fn: () => void;
};

export type LerpType = {
  x: number;
  y: number;
};

export type DirectionType = {
  x: number;
  y: number;
};

export type Slot = {
  item: Item | null;
  graphics: Graphics;
};

export type Slots = Slot[];
