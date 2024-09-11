import { Container, Sprite } from 'pixi.js';
import { IScene } from '@/interfaces';
import { GameManager } from '@core/Manager';
import { Cartridge, Coin, Player, Gun, Artifact, ReincarnationAbility, ProtectiveAbility } from '@core/Entities';
import { Keyboard } from '@core/Keyboard';
import { MenuScene } from '@core/Scenes';
import { MusicController } from '@core/Music';
import { AMMO_TYPE } from '@/types/ammo.enum';
import { HUDController } from '@core/Display';
import { Backpack } from '../Entities/Backpack';
import { ItemRarity } from '@/types/item-rarity.enum';
import { ItemType } from '@/types/item-type.enum';

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

    const itemProps1 = { amount: 300, type: ItemType.Currency, asset: 'coin', rarity: ItemRarity.Common };
    const itemProps2 = { amount: 3, type: ItemType.Artifact, asset: 'angel', rarity: ItemRarity.Legendary };
    const itemProps3 = { amount: 3, type: ItemType.Artifact, asset: 'bug', rarity: ItemRarity.Legendary };
    const coin = new Coin(itemProps1);
    const angel = new Artifact(itemProps2, new ReincarnationAbility());
    const bug = new Artifact(itemProps3, new ProtectiveAbility());
    this.player.addItemToBackpack(coin);
    this.player.addItemToBackpack(angel);
    this.player.addItemToBackpack(bug);
    this.display.updateUIBackpack();

    this.cartridge = new Cartridge(70, AMMO_TYPE.ENERGY, 3, this.display);
    this.gun = new Gun({}, this.player, this.cartridge, this.display);

    this.addChild(this.player.sprite);
    this.updateFloorBounds();

    this.testBackpack();
  }

  handleInput() {
    if (this.keyboard.state.get('Escape')) {
      this.manager.changeScene(new MenuScene());
    }
    if (this.keyboard.state.get('Digit1')) {
      this.display.setCurrentItem(0);
    }
    if (this.keyboard.state.get('Digit2')) {
      this.display.setCurrentItem(1);
    }
    if (this.keyboard.state.get('Digit3')) {
      this.display.setCurrentItem(2);
    }
    if (this.keyboard.state.get('Digit4')) {
      this.display.setCurrentItem(3);
    }
    if (this.keyboard.state.get('Digit5')) {
      this.display.setCurrentItem(4);
    }
    if (this.keyboard.state.get('Digit6')) {
      this.display.setCurrentItem(5);
    }
    if (this.keyboard.state.get('Digit7')) {
      this.display.setCurrentItem(6);
    }
    if (this.keyboard.state.get('Digit8')) {
      this.display.setCurrentItem(7);
    }
    if (this.keyboard.state.get('Digit9')) {
      this.display.setCurrentItem(8);
    }
    if (this.keyboard.state.get('Digit0')) {
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

  testBackpack() {
    // const itemProps1 = { amount: 300, type: ItemType.Currency, asset: 'coin', rarity: ItemRarity.Common };
    // const itemProps2 = { amount: 1, type: ItemType.Artifact, asset: 'bug', rarity: ItemRarity.Rare };
    // const itemProps3 = { amount: 4, type: ItemType.Material, asset: 'gasoline_can', rarity: ItemRarity.Unique };
    // const itemProps4 = { amount: 7, type: ItemType.Material, asset: 'empty_gasoline_can', rarity: ItemRarity.Common };
    // const coin = new Coin(itemProps1);
    // const bug = new Artifact(itemProps2, new ProtectiveAbility());
    // const gasoline_can = new Material(itemProps3);
    // const empty_gasoline_can = new Material(itemProps4);
    // backpack.add(coin);
    // backpack.add(bug);
    // backpack.add(gasoline_can);
    // backpack.add(empty_gasoline_can);
    // console.log(backpack.open());
    // this.display.setUIBackpack(backpack.open());
  }
}
