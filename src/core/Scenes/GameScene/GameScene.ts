import { Container, Sprite } from 'pixi.js';
import { IScene } from '@/interfaces';
import { GameManager } from '@core/Manager';
import { CharacterWithStrategy, MeleeAttack } from '../../Strategy';
import { Player } from '@core/Player';
import { Keyboard } from '@core/Keyboard';
import { MenuScene } from '@core/Scenes';
import { MusicController } from '@/core/Music/MusicController';
import { Cartridge, Gun } from '@/core/Weapons';
import { AMMO_TYPE } from '@/types/ammo.enum';
import { HUDController } from '@/core/Display';

export class GameScene extends Container implements IScene {
  private manager: GameManager = GameManager.getInstance();
  private display: HUDController = new HUDController();

  private background: Sprite;
  private music: MusicController;

  private player: Player;
  private readonly enemies: any;

  private floorBounds = { left: 0, right: 0, top: 0, bottom: 0 };
  private keyboard: Keyboard = Keyboard.getInstance();

  private gun: Gun;
  private cartridge: Cartridge;

  constructor() {
    super();

    this.display.init(this);

    this.background = Sprite.from('game_background');
    this.addChild(this.background);

    this.music = new MusicController();
    this.music.stop();

    this.player = new Player('bunny', 100, 100);
    this.cartridge = new Cartridge(70, AMMO_TYPE.ENERGY, 3);
    this.gun = new Gun(this.player, this.cartridge);

    let enemy1 = new CharacterWithStrategy('tile', 200, 200, new MeleeAttack());
    let enemy2 = new CharacterWithStrategy('tile', 300, 300, new MeleeAttack());

    this.enemies = [enemy1, enemy2];

    this.addChild(enemy1.sprite);
    this.addChild(enemy2.sprite);
    this.addChild(this.player.sprite);

    this.updateFloorBounds();
  }

  // TODO: add handleInput to IScene
  handleInput() {
    if (this.keyboard.state.get('Escape')) {
      this.manager.changeScene(new MenuScene());
    }
  }

  resize(_screenWidth: number, _screenHeight: number): void {
    this.display.resize(_screenWidth, _screenHeight);
    this.updateFloorBounds(_screenWidth, _screenHeight);
  }

  update(delta: number): void {
    this.handleInput();
    this.gun.update(delta);
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
