import { Container, Sprite } from 'pixi.js';
import { IScene, ItemProps } from '@/interfaces';
import { GameManager } from '@core/Manager';
import { Cartridge, Coin, Player, Gun, Artifact, ReincarnationAbility, ProtectiveAbility } from '@core/Entities';
import { Keyboard } from '@core/Keyboard';
import { MusicController } from '@core/Music';
import { AMMO_TYPE } from '@/types/ammo.enum';
import { HUDController } from '@core/Display';
import { Backpack } from '../Entities/Backpack';
import { ItemRarity } from '@/types/item-rarity.enum';
import { ItemType } from '@/types/item-type.enum';
import { Material } from '../Entities/Material';

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
    const itemProps2 = { amount: 1, type: ItemType.Artifact, asset: 'map', rarity: ItemRarity.Legendary };
    const itemProps3 = { amount: 3, type: ItemType.Artifact, asset: 'talisman_2', rarity: ItemRarity.Legendary };

    const coin = new Coin(itemProps1);
    const angel = new Artifact(itemProps2, new ReincarnationAbility());
    const bug = new Artifact(itemProps3, new ProtectiveAbility());

    const bookProps: ItemProps = { amount: 1, type: ItemType.Artifact, asset: 'book', rarity: ItemRarity.Unique };
    const book = new Artifact(bookProps, new ReincarnationAbility());

    const book1Props = { amount: 1, type: ItemType.Artifact, asset: 'book_2', rarity: ItemRarity.Unique };
    const book2Props = { amount: 3, type: ItemType.Artifact, asset: 'book_3', rarity: ItemRarity.Unique };
    const book3Props = { amount: 1, type: ItemType.Artifact, asset: 'book_1', rarity: ItemRarity.Unique };
    const book4Props = { amount: 2, type: ItemType.Artifact, asset: 'book_4', rarity: ItemRarity.Unique };
    const book5Props = { amount: 1, type: ItemType.Artifact, asset: 'book_5', rarity: ItemRarity.Unique };

    const magazine1Props = { amount: 1, type: ItemType.Artifact, asset: 'magazine_1', rarity: ItemRarity.Common };
    const magazine1 = new Artifact(magazine1Props, new ReincarnationAbility());
    this.player.addItemToBackpack(magazine1);

    const book_1 = new Artifact(book1Props, new ReincarnationAbility());
    const book_2 = new Artifact(book2Props, new ReincarnationAbility());
    const book_3 = new Artifact(book3Props, new ReincarnationAbility());
    const book_4 = new Artifact(book4Props, new ReincarnationAbility());
    const book_5 = new Artifact(book5Props, new ReincarnationAbility());

    this.player.addItemToBackpack(book);
    this.player.addItemToBackpack(book_1);
    this.player.addItemToBackpack(book_2);
    this.player.addItemToBackpack(book_3);
    this.player.addItemToBackpack(book_4);
    this.player.addItemToBackpack(book_5);

    const magazine2Props = { amount: 1, type: ItemType.Artifact, asset: 'magazine_2', rarity: ItemRarity.Common };
    const magazine2 = new Artifact(magazine2Props, new ReincarnationAbility());
    this.player.addItemToBackpack(magazine2);

    const magazine3Props = { amount: 1, type: ItemType.Artifact, asset: 'magazine_3', rarity: ItemRarity.Common };
    const magazine3 = new Artifact(magazine3Props, new ReincarnationAbility());
    this.player.addItemToBackpack(magazine3);

    const magazine4Props = { amount: 1, type: ItemType.Artifact, asset: 'magazine_4', rarity: ItemRarity.Common };
    const magazine4 = new Artifact(magazine4Props, new ReincarnationAbility());
    this.player.addItemToBackpack(magazine4);

    const magazine5Props = { amount: 1, type: ItemType.Artifact, asset: 'magazine_5', rarity: ItemRarity.Common };
    const magazine5 = new Artifact(magazine5Props, new ReincarnationAbility());
    this.player.addItemToBackpack(magazine5);

    const magazine6Props = { amount: 1, type: ItemType.Artifact, asset: 'magazine_6', rarity: ItemRarity.Common };
    const magazine6 = new Artifact(magazine6Props, new ReincarnationAbility());
    this.player.addItemToBackpack(magazine6);

    const magazine7Props = { amount: 122, type: ItemType.Artifact, asset: 'magazine_7', rarity: ItemRarity.Common };
    const magazine7 = new Artifact(magazine7Props, new ReincarnationAbility());
    this.player.addItemToBackpack(magazine7);

    const magazine8Props = { amount: 1, type: ItemType.Artifact, asset: 'magazine_8', rarity: ItemRarity.Common };
    const magazine8 = new Artifact(magazine8Props, new ReincarnationAbility());
    this.player.addItemToBackpack(magazine8);

    const magazine9Props = { amount: 1, type: ItemType.Artifact, asset: 'magazine_9', rarity: ItemRarity.Common };
    const magazine9 = new Artifact(magazine9Props, new ReincarnationAbility());
    this.player.addItemToBackpack(magazine9);

    const magazine10Props = { amount: 1, type: ItemType.Artifact, asset: 'magazine_10', rarity: ItemRarity.Common };
    const magazine10 = new Artifact(magazine10Props, new ReincarnationAbility());
    this.player.addItemToBackpack(magazine10);

    const magazine11Props = { amount: 1, type: ItemType.Artifact, asset: 'magazine_11', rarity: ItemRarity.Common };
    const magazine11 = new Artifact(magazine11Props, new ReincarnationAbility());
    this.player.addItemToBackpack(magazine11);

    const mineralProps = { amount: 21, type: ItemType.Material, asset: 'mineral', rarity: ItemRarity.Rare };
    const mineral = new Material(mineralProps);
    this.player.addItemToBackpack(mineral);

    const gas = { amount: 21, type: ItemType.Material, asset: 'gasoline', rarity: ItemRarity.Unique };
    const gas_ = new Material(gas);
    this.player.addItemToBackpack(gas_);

    this.player.addItemToBackpack(coin);
    this.player.addItemToBackpack(angel);
    this.player.addItemToBackpack(bug);
    this.display.updateUIBackpack();

    this.cartridge = new Cartridge(70, AMMO_TYPE.ENERGY, 3, this.display);
    this.gun = new Gun({}, this.player, this.cartridge, this.display);

    this.addChild(this.player.sprite);
    this.updateFloorBounds();
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
