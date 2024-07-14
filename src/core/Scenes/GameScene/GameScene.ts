import { Container, Sprite } from 'pixi.js';
import { IScene } from '../../../interfaces';
import { Manager } from '../Manager/Manager';

export class GameScene extends Container implements IScene {
  private bunny: Sprite;
  private bunnyVelocity: number;

  constructor() {
    super();

    this.bunny = Sprite.from('bunny');

    this.bunny.anchor.set(0.5);
    this.bunny.x = Manager.width / 2;
    this.bunny.y = Manager.height / 2;
    this.addChild(this.bunny);

    this.bunnyVelocity = 5;
  }

  public update(framesPassed: number): void {
    // Lets move bunny!
    this.bunny.x += this.bunnyVelocity * framesPassed;

    if (this.bunny.x > Manager.width) {
      this.bunny.x = Manager.width;
      this.bunnyVelocity = -this.bunnyVelocity;
    }

    if (this.bunny.x < 0) {
      this.bunny.x = 0;
      this.bunnyVelocity = -this.bunnyVelocity;
    }
  }
}
