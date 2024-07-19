import { Container, Sprite } from 'pixi.js';
import { IScene } from '../../../interfaces';
import { Manager } from '../../Manager/Manager';
import Player from '../../Player/Player';

export class GameScene extends Container implements IScene {
  private backgroundTiles: Sprite[] = [];
  private bunny: Sprite;
  private bunnyVelocity: number;
  private manager: Manager;
  private player: Player;

  constructor() {
    super();
    this.manager = Manager.getInstance();

    this.player = new Player();
    this.player.draw(this);

    this.bunny = Sprite.from('bunny');
    this.bunny.anchor.set(0.5);
    this.bunny.x = this.manager.getWidth() / 2;
    this.bunny.y = this.manager.getHeight() / 2;
    this.bunnyVelocity = 2;

    this.addChild(this.bunny);
    this.tileBackground();
  }

  private tileBackground(): void {
    this.backgroundTiles = [];

    const sprite = Sprite.from('ground');
    sprite.scale.set(7);

    const tilesNeeded = Math.ceil(this.manager.getWidth() / sprite.width);
    for (let i = 0; i < tilesNeeded; i++) {
      const tile = Sprite.from('ground');
      tile.anchor.set(0, 1);
      tile.scale.set(7);
      tile.position.set(i * tile.width, this.manager.getHeight());
      this.addChild(tile);
      this.backgroundTiles.push(tile);
    }
  }

  resize(_screenWidth: number, _screenHeight: number): void {
    for (const tile of this.backgroundTiles) {
      this.removeChild(tile);
    }

    this.tileBackground();
  }

  public update(framesPassed: number): void {
    this.bunny.x += this.bunnyVelocity * framesPassed;

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
