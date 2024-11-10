import { Container, Sprite } from 'pixi.js';
import { IScene } from '@/interfaces';
import { GameManager } from '@core/Manager';
import { Cartridge, Player, Gun } from '@core/Entities';
import { Keyboard } from '@core/Keyboard';
import { MusicController } from '@core/Music';
import { AMMO_TYPE } from '@/types/ammo.enum';
import { HUDController } from '@core/Display';
import { Backpack } from '../Entities/Backpack';
import GameFactory from '@core/Entities/Factory/GameFactory.ts';
import { ItemService } from '@/api';

export class GameScene extends Container implements IScene {
  private manager: GameManager = GameManager.getInstance();
  private display: HUDController;

  private background: Sprite;
  private music: MusicController;

  private player: Player;
  private backpack: Backpack;
  private readonly enemies: any = [];

  private floorBounds = { left: 0, right: 0, top: 0, bottom: 0 };
  private keyboard: Keyboard = Keyboard.getInstance();

  private gun: Gun;
  private cartridge: Cartridge;

  constructor() {
    super();

    this.background = Sprite.from('game_background');
    this.addChild(this.background);

    this.music = new MusicController();
    this.music.stop();

    this.backpack = new Backpack();
    this.player = new Player('bunny', 100, 100, this.backpack);
    this.display = new HUDController(this.player, this);

    this.cartridge = new Cartridge(70, AMMO_TYPE.ENERGY, 3, this.display);
    this.gun = new Gun({}, this.player, this.cartridge, this.display);

    this.addChild(this.player.sprite);
    this.updateFloorBounds();

    const game = new GameFactory();
    const itemService = new ItemService();

    itemService.fetchAllItems().then((data) => {
      game.itemFactory.generateItemsForPlayer('playerId', this.player, data);
      this.display.updateUIBackpack();
    });
  }

  handleInput() {
    if (this.keyboard.isKeyJustPressed('Escape')) {
      this.display.showFullInventoryWithSettings();
    }

    if (this.keyboard.isKeyJustPressed('Digit1')) {
      this.display.setCurrentItem(0);
    }
    if (this.keyboard.isKeyJustPressed('Digit2')) {
      this.display.setCurrentItem(1);
    }
    if (this.keyboard.isKeyJustPressed('Digit3')) {
      this.display.setCurrentItem(2);
    }
    if (this.keyboard.isKeyJustPressed('Digit4')) {
      this.display.setCurrentItem(3);
    }
    if (this.keyboard.isKeyJustPressed('Digit5')) {
      this.display.setCurrentItem(4);
    }
    if (this.keyboard.isKeyJustPressed('Digit6')) {
      this.display.setCurrentItem(5);
    }
    if (this.keyboard.isKeyJustPressed('Digit7')) {
      this.display.setCurrentItem(6);
    }
    if (this.keyboard.isKeyJustPressed('Digit8')) {
      this.display.setCurrentItem(7);
    }
    if (this.keyboard.isKeyJustPressed('Digit9')) {
      this.display.setCurrentItem(8);
    }
    if (this.keyboard.isKeyJustPressed('Digit0')) {
      this.display.setCurrentItem(9);
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
