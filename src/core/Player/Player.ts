import { Sprite } from 'pixi.js';
import { IPlayer, IScene } from '../../interfaces';
import { Manager } from '../Manager/Manager';

export default class Player implements IPlayer {
  private hero: Sprite;
  private manager: Manager;

  constructor() {
    this.manager = Manager.getInstance();

    this.hero = Sprite.from('bunny');
    this.hero.x = this.manager.getWidth() / 2;
    this.hero.y = this.manager.getHeight() / 2;
    this.hero.anchor.set(0.5);
  }

  sync(): void {
    throw new Error('Method not implemented.');
  }

  init(): void {
    console.log('init');
  }

  draw(gameScene: IScene): void {
    gameScene.addChild(this.hero);
  }

  close(): void {
    console.log('close');
  }
}
