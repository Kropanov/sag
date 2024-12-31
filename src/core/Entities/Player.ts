import { Backpack, Character } from '@core/Entities';
import { GameManager } from '@core/Managers';

export class Player extends Character {
  private game: GameManager = new GameManager();

  prevY: number;
  prevX: number;

  velocity: number = 4;

  hudBackpack;

  constructor(texture: string, x: number, y: number, backpack: Backpack) {
    super(texture, x, y, backpack);
    this.prevX = x;
    this.prevY = y;

    this.hudBackpack = this.game.hud.getComponent('backpack');

    this.hudBackpack.entity = backpack;
    this.hudBackpack.inventory = backpack.open();

    this.game.hud.hideHUD();
  }

  update(delta: number, enemies: any, floorBounds: any) {
    this.prevX = this.sprite.x;
    this.prevY = this.sprite.y;

    super.update(delta, enemies, floorBounds);

    enemies.forEach((enemy: any) => {
      if (this.checkCollision(enemy)) {
        this.sprite.x = this.prevX;
        this.sprite.y = this.prevY;
      }
    });

    this.checkFloorBounds(floorBounds);
  }

  checkFloorBounds(bounds: any) {
    if (this.sprite.x < bounds.left) {
      this.sprite.x = bounds.left;
    }
    if (this.sprite.x + this.sprite.width > bounds.right) {
      this.sprite.x = bounds.right - this.sprite.width;
    }
    if (this.sprite.y < bounds.top) {
      this.sprite.y = bounds.top;
    }
    if (this.sprite.y + this.sprite.height > bounds.bottom) {
      this.sprite.y = bounds.bottom - this.sprite.height;
    }
  }
}
