import { Container, Sprite } from 'pixi.js';
import { IScene } from '../../../interfaces';
import { GameManager } from '../../Manager/GameManager';
import Player from '../../Player/Player';
import { rectIntersect } from '../../../utils';

export class GameScene extends Container implements IScene {
  private ground!: Sprite;
  private manager: GameManager = GameManager.getInstance();
  private player: Player;

  constructor() {
    super();

    this.player = new Player();
    this.player.init();
    this.player.draw(this);
    this.background();
  }

  resize(_screenWidth: number, _screenHeight: number): void {
    this.removeChild(this.ground);
    this.background();
  }

  update(framesPassed: number): void {
    this.player.sync(framesPassed);
    this.detectCollisions();
  }

  private background(): void {
    this.ground = Sprite.from('ground');
    this.ground.scale.set(7);
    this.ground.anchor.set(0, 1);
    this.ground.position.set(0, this.manager.getHeight());
    this.ground.width = this.manager.getWidth();
    this.ground.height = this.manager.getHeight() / 4;
    this.addChild(this.ground);
  }

  public detectCollisions() {
    if (
      rectIntersect(
        this.player.hero.x,
        this.player.hero.y,
        this.player.hero.width,
        this.player.hero.height,
        this.ground.x,
        this.ground.y,
        this.ground.width,
        this.ground.height,
        this.player.hero.anchor.x,
        this.player.hero.anchor.y,
        this.ground.anchor.x,
        this.ground.anchor.y,
      )
    ) {
      this.player.isColliding = true;
    } else {
      this.player.isColliding = false;
    }
    // console.log(this.player.isColliding);
  }
}
