import { Container, Sprite } from 'pixi.js';
import { IScene } from '../../../interfaces';
import { Manager } from '../../Manager/Manager';

export class GameScene extends Container implements IScene {
  private bunny: Sprite;
  private bunnyVelocity: number;
  private manager: Manager;

  constructor() {
    super();

    this.manager = Manager.getInstance();

    this.bunny = Sprite.from('bunny');
    this.bunny.anchor.set(0.5);
    this.bunny.x = this.manager.getWidth() / 2;
    this.bunny.y = this.manager.getHeight() / 2;
    this.addChild(this.bunny);

    this.bunnyVelocity = 2;
  }

  resize(_screenWidth: number, _screenHeight: number): void {}

  public update(framesPassed: number): void {
    this.bunny.x += this.bunnyVelocity * framesPassed;

    this.manager = Manager.getInstance();

    if (this.bunny.x > this.manager.getWidth()) {
      this.bunny.x = this.manager.getWidth();
      this.bunnyVelocity = -this.bunnyVelocity;
    }

    if (this.bunny.x < 0) {
      this.bunny.x = 0;
      this.bunnyVelocity = -this.bunnyVelocity;
    }
  }
}
