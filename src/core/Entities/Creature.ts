import { g } from '@config';
import { Sprite } from 'pixi.js';

export class Creature {
  sprite: Sprite;

  vx: number;
  vy: number;

  constructor(texture: string, x: any, y: any) {
    this.sprite = Sprite.from(texture);
    this.sprite.x = x;
    this.sprite.y = y;
    this.vx = 0;
    this.vy = 0;
  }

  update(delta: number) {
    // Add gravity to velocity
    this.vy += g * delta;

    this.sprite.x += this.vx * delta;
    this.sprite.y += this.vy * delta;
  }
}
