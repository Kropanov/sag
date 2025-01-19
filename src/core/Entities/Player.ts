import { Backpack, Character } from '@core/Entities';
import { GameManager } from '@core/Managers';
import { HUDController } from '@core/Display';

export class Player extends Character {
  private game: GameManager = new GameManager();
  private hud = new HUDController();

  prevY: number;
  prevX: number;

  velocity: number = 3;

  hudBackpack;

  constructor(texture: string, x: number, y: number, backpack: Backpack) {
    super(texture, x, y, backpack);
    this.prevX = x;
    this.prevY = y;

    this.hudBackpack = this.game.hud.getComponent('backpack');

    this.hudBackpack.entity = backpack;
    this.hudBackpack.inventory = backpack.open();
  }

  updateState(action: string, keyCode: string) {
    const speed = 4;

    switch (action) {
      case 'keydown':
        if (keyCode === 'KeyW') this.vy = -speed;
        if (keyCode === 'KeyS') this.vy = speed;
        if (keyCode === 'KeyA') this.vx = -speed;
        if (keyCode === 'KeyD') this.vx = speed;
        if (keyCode === 'Space') this.vy = -speed * 2;
        break;
      case 'keyup':
        if (keyCode === 'KeyW' || keyCode === 'KeyS') this.vy = 0;
        if (keyCode === 'KeyA' || keyCode === 'KeyD') this.vx = 0;
        break;
    }
  }

  loop(delta: number, enemies: any, floorBounds: any) {
    this.prevX = this.sprite.x;
    this.prevY = this.sprite.y;

    super.update(delta);

    enemies.forEach((enemy: any) => {
      if (this.checkCollision(enemy)) {
        this.sprite.x = this.prevX;
        this.sprite.y = this.prevY;
      }
    });

    this.checkFloorBounds(floorBounds);

    this.hud.handleInput();
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
