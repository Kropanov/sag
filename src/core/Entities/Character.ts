import { rectIntersect } from '@/utils';
import { Creature } from '@/core/Entities';

export class Character extends Creature {
  health: number;
  attackPower: number;
  defensePower: number;

  constructor(texture: string, x: any, y: any) {
    super(texture, x, y);
    this.health = 100;
    this.attackPower = 10;
    this.defensePower = 5;
  }

  move(dx: number, dy: number) {
    this.vx = dx;
    this.vy = dy;
  }

  attack(target: { takeDamage: (arg0: any) => void }) {
    target.takeDamage(this.attackPower);
  }

  takeDamage(amount: number) {
    this.health -= amount;
    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    this.sprite.visible = false;
  }

  checkCollision(other: any) {
    return rectIntersect(
      this.sprite.x,
      this.sprite.y,
      this.sprite.width,
      this.sprite.height,
      other.sprite.x,
      other.sprite.y,
      other.sprite.width,
      other.sprite.height,
      this.sprite.anchor.x,
      this.sprite.anchor.y,
      other.sprite.anchor.x,
      other.sprite.anchor.y,
    );
  }
}