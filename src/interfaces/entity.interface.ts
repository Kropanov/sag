import { vCollisionNormType } from '@types';

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
