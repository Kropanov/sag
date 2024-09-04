import { Container, Sprite } from 'pixi.js';
import { IScene } from '@/interfaces';
import { GameManager } from '@core/Manager';
import { Player } from '@core/Entities';
import { Keyboard } from '@core/Keyboard';
import { MenuScene } from '@core/Scenes';
import { MusicController } from '@/core/Music';
import { Cartridge, Gun } from '@/core/Entities';
import { AMMO_TYPE } from '@/types/ammo.enum';
import { HUDController } from '@/core/Display';
import { Backpack } from '../Entities/Backpack';
import { ItemRarity } from '@/types/item-rarity.enum';
import { ItemType } from '@/types/item-type.enum';

export class GameScene extends Container implements IScene {
  private manager: GameManager = GameManager.getInstance();
  private display: HUDController = new HUDController();

  private background: Sprite;
  private music: MusicController;

  private player: Player;
  private readonly enemies: any = [];

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
    this.gun = new Gun({}, this.player, this.cartridge);

    this.addChild(this.player.sprite);
    this.updateFloorBounds();

    this.testBackpack();
  }

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

  testBackpack() {
    const backpack = new Backpack();

    const player = new Player('bunny', 100, 100);
    const cartridge = new Cartridge(70, AMMO_TYPE.DIVINE, 3);

    const itemProps1 = { cost: 120, type: ItemType.Gun, asset: 'pistol', rarity: ItemRarity.Common };
    const itemProps2 = { cost: 220, asset: 'coin', rarity: ItemRarity.Legendary };
    const itemProps3 = { cost: 1120, type: ItemType.Gun, asset: 'angel', rarity: ItemRarity.Legendary };
    const itemProps4 = { cost: 1120, type: ItemType.Gun, asset: 'bug', rarity: ItemRarity.Legendary };
    const itemProps5 = { cost: 1120, type: ItemType.Gun, asset: 'coal', rarity: ItemRarity.Legendary };
    const itemProps6 = { cost: 1120, type: ItemType.Gun, asset: 'talisman', rarity: ItemRarity.Legendary };

    const item1 = new Gun(itemProps1, player, cartridge);
    const item2 = new Gun(itemProps2, player, cartridge);
    const item3 = new Gun(itemProps3, player, cartridge);
    const item4 = new Gun(itemProps4, player, cartridge);
    const item5 = new Gun(itemProps5, player, cartridge);
    const item6 = new Gun(itemProps6, player, cartridge);

    backpack.Add(item1);
    backpack.Add(item2);
    backpack.Add(item3);
    backpack.Add(item4);
    backpack.Add(item5);
    backpack.Add(item6);

    this.display.setUIBackpack(backpack.Open());
  }
}
