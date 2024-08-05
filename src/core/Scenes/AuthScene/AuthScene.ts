import { GameManager } from '@/core/Manager';
import { IScene } from '@/interfaces';
import { Container, Graphics } from 'pixi.js';

export class AuthScene extends Container implements IScene {
  private manager: GameManager = GameManager.getInstance();
  private container: Graphics;

  constructor() {
    super();

    this.container = new Graphics();
    this.drawContainer();
  }

  drawContainer() {
    this.container.rect(0, 0, 550, 650).fill('#282828');

    this.container.stroke({
      color: 'black',
      width: 1,
      alignment: 0.5,
    });

    this.container.pivot.set(275, 325);
    this.container.position.set(this.manager.getWidth() / 2, this.manager.getHeight() / 2);

    this.addChild(this.container);
  }

  update(_framesPassed: number): void {}

  resize(_screenWidth: number, _screenHeight: number): void {
    this.container.position.set(this.manager.getWidth() / 2, this.manager.getHeight() / 2);
  }
}
