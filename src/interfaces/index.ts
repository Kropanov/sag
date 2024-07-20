import { ContainerChild } from 'pixi.js';
import { vCollisionNormType } from '../types';

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
  context: any;
  x: number;
  y: number;
  vx: number;
  vy: number;
  isColliding: boolean;

  moveLeft(fps: number): void;
  moveRight(fps: number): void;
  handleCollision(vCollisionNorm: vCollisionNormType, speed: number): void;
}
