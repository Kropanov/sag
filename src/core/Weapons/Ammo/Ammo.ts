import { DirectionType } from '@/types';
import { Sprite } from 'pixi.js';

export class Ammo {
  private sprite: Sprite;
  private damage: number;
  private type: string;
  private direction: DirectionType = { x: 0, y: 0 };

  constructor(damage: number, type: string) {
    this.sprite = Sprite.from(type);
    this.damage = damage;
    this.type = type;

    this.setSpriteSize();
  }

  setAmmo(damage: number, type: string) {
    this.sprite = Sprite.from(type);
    this.damage = damage;
    this.type = type;
  }

  setDirection(direction: DirectionType) {
    this.direction.x = direction.x;
    this.direction.y = direction.y;
  }

  setSpriteSize(x: number = 0.05, y: number = 0.05) {
    this.sprite.scale.x = x;
    this.sprite.scale.y = y;
  }

  setSpritePosition(x: number, y: number) {
    this.sprite.x = x;
    this.sprite.y = y;
  }

  getDirection(): DirectionType {
    return this.direction;
  }

  getSprite(): Sprite {
    return this.sprite;
  }

  getDamage(): number {
    return this.damage;
  }

  getType(): string {
    return this.type;
  }

  updatePosition(x: number, y: number) {
    this.sprite.position.set(x, y);
  }

  checkCollision() {}
}
