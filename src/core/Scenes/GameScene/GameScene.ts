import { Container, Sprite } from 'pixi.js';
import { IScene } from '../../../interfaces';
import { Manager } from '../../Manager/Manager';
import Player from '../../Player/Player';

export class GameScene extends Container implements IScene {
  private backgroundTiles: Sprite[] = [];
  private manager: Manager = Manager.getInstance();
  private player: Player;

  constructor() {
    super();

    this.player = new Player();
    this.player.init();
    this.player.draw(this);

    this.tileBackground();
  }

  resize(_screenWidth: number, _screenHeight: number): void {
    for (const tile of this.backgroundTiles) {
      this.removeChild(tile);
    }

    this.tileBackground();
  }

  public update(framesPassed: number): void {
    this.player.sync(framesPassed);
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
}
