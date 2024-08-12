import { Container, Sprite } from 'pixi.js';
import { IScene } from '@/interfaces';
import { GameManager } from '@core/Manager';
import { CharacterWithStrategy, MeleeAttack } from '../../Strategy';
import { Player } from '@core/Player';
import { Keyboard } from '@core/Keyboard';
import { MenuScene } from '@core/Scenes';
import { MusicController } from '@/core/Music/MusicController';

export class GameScene extends Container implements IScene {
  private manager: GameManager = GameManager.getInstance();
  private player: Player;
  private readonly enemies: any;

  private floorBounds = { left: 0, right: 0, top: 0, bottom: 0 };
  private keyboard: Keyboard = Keyboard.getInstance();
  private nv: any = {
    x: 0,
    y: 0,
  };

  star: Sprite;

  constructor() {
    super();

    const player = new MusicController();
    player.stop();

    this.star = Sprite.from('star');
    this.star.scale.x = 0.05;
    this.star.scale.y = 0.05;

    this.player = new Player('bunny', 100, 100);

    let enemy1 = new CharacterWithStrategy('tile', 200, 200, new MeleeAttack());
    let enemy2 = new CharacterWithStrategy('tile', 300, 300, new MeleeAttack());

    this.enemies = [enemy1, enemy2];

    this.addChild(enemy1.sprite);
    this.addChild(enemy2.sprite);
    this.addChild(this.player.sprite);

    this.updateFloorBounds();

    window.addEventListener('mousedown', this.click.bind(this));
  }

  click({ clientX, clientY }: MouseEvent) {
    const x0 = this.player.prevX;
    const y0 = this.player.prevY;

    const x1 = clientX;
    const y1 = clientY;

    const v = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2);
    this.nv = { x: (x1 - x0) / v, y: (y1 - y0) / v };

    this.star.x = x0;
    this.star.y = y0;

    this.addChild(this.star);
  }

  // TODO: add handleInput to IScene
  handleInput() {
    if (this.keyboard.state.get('Escape')) {
      this.manager.changeScene(new MenuScene());
    }
  }

  resize(_screenWidth: number, _screenHeight: number): void {
    this.updateFloorBounds(_screenWidth, _screenHeight);
  }

  handleStar(delta: number) {
    console.log(this.star.x, this.star.y);
    if (this.nv.x !== 0 || this.nv.y !== 0) {
      this.star.x += this.nv.x * delta;
      this.star.y += this.nv.y * delta;
    }
  }

  update(delta: number): void {
    this.handleInput();
    this.handleStar(delta);
    this.player.update(delta, this.enemies, this.floorBounds);
  }

  private updateFloorBounds(_screenWidth?: number, _screenHeight?: number): void {
    const screenWidth = _screenWidth || this.manager.getWidth();
    const screenHeight = _screenHeight || this.manager.getHeight();

    this.floorBounds = {
      left: 0,
      right: screenWidth,
      top: 0,
      bottom: screenHeight,
    };
  }
}
