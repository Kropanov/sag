import { Sprite } from 'pixi.js';
import { IPlayer, IScene } from '../../interfaces';
import { Manager } from '../Manager/Manager';
import Keyboard from '../Keyboard/Keyboard';

export default class Player implements IPlayer {
  private hero!: Sprite;
  private manager!: Manager;
  private keyboard!: Keyboard;
  private velocity: number = 4;

  constructor() {
    this.init();
  }

  init(): void {
    this.keyboard = Keyboard.getInstance();
    this.manager = Manager.getInstance();

    this.hero = Sprite.from('bunny');
    this.hero.x = this.manager.getWidth() / 2;
    this.hero.y = this.manager.getHeight() / 2;
    this.hero.anchor.set(0.5);
  }

  sync(framesPassed: number): void {
    if (this.keyboard.state.get('KeyA')) {
      this.hero.x += -this.velocity * framesPassed;
    } else if (this.keyboard.state.get('KeyD')) {
      this.hero.x += this.velocity * framesPassed;
    }
    if (this.keyboard.state.get('KeyW')) {
      this.hero.y += -this.velocity * framesPassed;
    } else if (this.keyboard.state.get('KeyS')) {
      this.hero.y += this.velocity * framesPassed;
    }
  }

  draw(gameScene: IScene): void {
    gameScene.addChild(this.hero);
  }
}
