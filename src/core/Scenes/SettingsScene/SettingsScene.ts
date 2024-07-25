import { Container, Graphics } from 'pixi.js';
import { IScene } from '../../../interfaces';
import { GameManager } from '../../Manager/GameManager';

const OFFSET = 1.4;

export default class SettingsScene extends Container implements IScene {
  private manager: GameManager = GameManager.getInstance();
  private container: Graphics;

  constructor() {
    super();

    this.container = new Graphics();
    this.container
      .filletRect(0, 0, this.manager.getWidth() / OFFSET, this.manager.getHeight() / OFFSET, 10)
      .fill('#36393B');

    this.addChild(this.container);

    this.resize(this.manager.getWidth(), this.manager.getHeight());
  }

  update(_framesPassed: number): void {}

  resize(_screenWidth: number, _screenHeight: number): void {
    const containerWidth = _screenWidth / OFFSET;
    const containerHeight = _screenHeight / OFFSET;

    this.container.x = (_screenWidth - containerWidth) / 2;
    this.container.y = (_screenHeight - containerHeight) / 2;
    this.container.width = containerWidth;
    this.container.height = containerHeight;
  }
}
