import { Container, Sprite } from 'pixi.js';
import { Cartridge, Player, Gun, GameFactory, Backpack } from '@core/Entities';
import { HUDController } from '@core/Display';
import { GameManager } from '@core/Managers';
import { IScene } from '@interfaces';
import { AMMO_TYPE } from '@enums';
import { ItemService } from '@api';

export class GameScene extends Container implements IScene {
  private game: GameManager = new GameManager();
  private readonly display: HUDController;

  private readonly background: Sprite;

  private readonly player: Player;
  private readonly backpack: Backpack;
  private readonly enemies: any = [];

  private floorBounds = { left: 0, right: 0, top: 0, bottom: 0 };

  private gun: Gun;
  private readonly cartridge: Cartridge;

  constructor() {
    super();

    this.background = Sprite.from('game_background');
    this.addChild(this.background);

    this.game.audio.stop();

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
    if (this.game.keyboard.isKeyJustPressed('Escape')) {
      this.display.showFullInventoryWithSettings();
    }

    if (this.game.keyboard.isKeyJustPressed('Digit1')) {
      this.display.setCurrentItem(0);
    }
    if (this.game.keyboard.isKeyJustPressed('Digit2')) {
      this.display.setCurrentItem(1);
    }
    if (this.game.keyboard.isKeyJustPressed('Digit3')) {
      this.display.setCurrentItem(2);
    }
    if (this.game.keyboard.isKeyJustPressed('Digit4')) {
      this.display.setCurrentItem(3);
    }
    if (this.game.keyboard.isKeyJustPressed('Digit5')) {
      this.display.setCurrentItem(4);
    }
    if (this.game.keyboard.isKeyJustPressed('Digit6')) {
      this.display.setCurrentItem(5);
    }
    if (this.game.keyboard.isKeyJustPressed('Digit7')) {
      this.display.setCurrentItem(6);
    }
    if (this.game.keyboard.isKeyJustPressed('Digit8')) {
      this.display.setCurrentItem(7);
    }
    if (this.game.keyboard.isKeyJustPressed('Digit9')) {
      this.display.setCurrentItem(8);
    }
    if (this.game.keyboard.isKeyJustPressed('Digit0')) {
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
    const screenWidth = _screenWidth || this.game.scene.getWidth();
    const screenHeight = _screenHeight || this.game.scene.getHeight();

    this.floorBounds = {
      left: 0,
      right: screenWidth,
      top: 0,
      bottom: screenHeight,
    };
  }
}
