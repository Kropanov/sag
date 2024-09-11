import { Container, ContainerChild } from 'pixi.js';
import { vCollisionNormType } from '@/types';
import { ItemRarity } from '@/types/item-rarity.enum';
import { ItemType } from '@/types/item-type.enum';

export interface IScene extends ContainerChild {
  update(framesPassed: number): void;
  resize(screenWidth: number, screenHeight: number): void;
}

export interface IPlayer {
  init(): void;
  sync(framesPassed: number): void;
  draw(gameScene: IScene): void;
}

export interface IEntity {
  x: number;
  y: number;
  vx: number;
  vy: number;
  isColliding: boolean;

  moveLeft(fps: number): void;
  moveRight(fps: number): void;
  handleCollision(vCollisionNorm: vCollisionNormType, speed: number): void;
}

export interface ItemProps {
  name?: string;
  cost?: number;
  asset?: string;
  type?: ItemType;
  amount?: number;
  rarity?: ItemRarity;
  description?: string;
}

export interface UIComponent {
  render(): Array<ContainerChild>;
  getContainer(): Container;
  addComponent(component: UIComponent): void;
  resize(screenWidth: number, screenHeight: number): void;
}

export interface ArtifactAbility {
  use(): void;
}
