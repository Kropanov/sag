import { Container, Sprite } from 'pixi.js';
import { IScene } from '../interfaces';
import { Manager } from './Scenes/Manager/Manager';

export class Scene extends Container implements IScene {
  private bunny: Sprite;
  private bunnyVelocity: number;
  private manager: Manager;

  constructor() {
    super();

    this.manager = Manager.getInstance();

    this.bunny = Sprite.from('bunny.png');
    console.log(this.bunny);
    this.bunny.anchor.set(0.5);
    this.bunny.x = 0;
    this.bunny.y = this.manager.getHeight() / 2;
    this.addChild(this.bunny);

    this.bunnyVelocity = 2;
  }
  resize(screenWidth: number, screenHeight: number): void {
    throw new Error('Method not implemented.');
  }

  public update(framesPassed: number): void {
    this.bunny.x += this.bunnyVelocity * framesPassed;

    const width = this.manager.getWidth();
    if (this.bunny.x > width) {
      this.bunny.x = width;
      this.bunnyVelocity = -this.bunnyVelocity;
    }

    if (this.bunny.x < 0) {
      this.bunny.x = 0;
      this.bunnyVelocity = -this.bunnyVelocity;
    }
  }
}
