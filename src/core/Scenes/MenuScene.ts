import { Container, Point, Sprite, Text } from 'pixi.js';
import { HoverInfo, IScene } from '@interfaces';
import { FancyButton, List } from '@pixi/ui';
import { MenuItemsType } from '@types';
import { FANCY_BUTTON_BASE_ANIMATION, theme } from '@config';
import { AuthScene, GameScene } from '@core/Scenes';
import { GameManager, SceneManager } from '@core/Managers';
import {
  getProgramVersion,
  getSocialMediaIcons,
  handleProgramVersionResize,
  handleSocialMediaIconsResize,
} from '@core/Misc';
import { Artifact, Backpack, Chest, ReincarnationAbility } from '@core/Entities';
import { ItemRarity, ItemType } from '@enums';
import { InventoryBag, InventoryHoverInfoBox, SharedChest } from '@core/Display';

export class MenuScene extends Container implements IScene {
  private game: GameManager = new GameManager();
  private scene: SceneManager = new SceneManager();

  private readonly background: Sprite;
  private readonly version!: Text;
  private readonly menu: List;

  private items: Array<MenuItemsType> = [
    { text: 'New', fn: () => this.startGame() },
    { text: 'Load', fn: () => {} },
    { text: 'Online', fn: () => {} },
    { text: 'Settings', fn: () => this.openSettings() },
    { text: 'Credits', fn: () => {} },
    { text: 'Log out', fn: () => this.logout() },
  ];

  private readonly socialMediaIcons: Container;

  private readonly hudSharedChest: SharedChest | undefined;
  private readonly hudBackpack: InventoryBag | undefined;
  private readonly hudHoverInfoBox: InventoryHoverInfoBox | undefined;

  constructor() {
    super();

    this.hudBackpack = this.game.hud.getComponent('backpack');
    this.hudSharedChest = this.game.hud.getComponent('chest');
    this.hudHoverInfoBox = this.game.hud.getComponent('itemInfoBox');

    this.background = Sprite.from('menu_background');
    this.addChild(this.background);

    this.version = getProgramVersion();
    this.addChild(this.version);

    this.socialMediaIcons = getSocialMediaIcons();
    this.addChild(this.socialMediaIcons);

    this.menu = new List({
      elementsMargin: 10,
      type: 'vertical',
    });

    this.menu.x = this.game.size.getWidth() / 2;
    this.menu.y = this.game.size.getHeight() / 2.3;

    this.fillMenu();

    this.addChild(this.menu);

    // FIXME: only for testing purposes
    // -----------------------------------------
    const backpack = new Backpack();
    const book1Props = { amount: 3, type: ItemType.Artifact, asset: 'book_1', rarity: ItemRarity.Unique };
    const book_1 = new Artifact(book1Props, new ReincarnationAbility());
    backpack.push(book_1);

    const chest = new Chest();
    const book2Props = { amount: 1, type: ItemType.Artifact, asset: 'book_3', rarity: ItemRarity.Unique };
    const book_2 = new Artifact(book2Props, new ReincarnationAbility());

    const book3Props = { amount: 1, type: ItemType.Artifact, asset: 'book_4', rarity: ItemRarity.Unique };
    const book_3 = new Artifact(book3Props, new ReincarnationAbility());
    chest.push(book_2);
    chest.push(book_3);

    if (this.hudBackpack) {
      this.hudBackpack.entity = backpack;
      this.hudBackpack.inventory = backpack.open();

      this.hudBackpack.registerEvent('showHoverInfoBox', (hoverInfo: HoverInfo) => {
        console.log('Call');
        this.showItemHoverInfo(hoverInfo);
      });
    }

    if (this.hudSharedChest) {
      this.hudSharedChest.entity = chest;
      this.hudSharedChest.inventory = chest.open();
    }
    // -----------------------------------------
  }

  public showItemHoverInfo(hoverInfo: HoverInfo) {
    const { targetItem, cursorX, cursorY } = hoverInfo;
    const globalPoint = new Point(cursorX, cursorY);
    const localPoint = this.scene.getCurrentScene()?.toLocal(globalPoint);
    if (this.hudHoverInfoBox) {
      console.log('fef ');
      console.log(targetItem, localPoint);
      this.hudHoverInfoBox.setPosition(localPoint?.x, localPoint?.y);
      this.hudHoverInfoBox.setItem(targetItem);
      this.hudHoverInfoBox.show();
    }
  }

  // FIXME: remove after testing
  handleInput() {
    if (this.game.keyboard.isKeyJustPressed('Escape')) {
      this.hudBackpack?.showFullInventory();
    }
  }

  startGame() {
    this.scene.changeScene(GameScene);
  }

  fillMenu() {
    this.items.map((_) => {
      const button = new FancyButton({
        text: new Text({
          text: _.text,
          style: {
            fontSize: 25,
            fill: theme.neutral.white,
            align: 'center',
          },
        }),
        animations: FANCY_BUTTON_BASE_ANIMATION,
      });

      // button.onHover.connect(() => sound.play('menu_item_click3'));
      // FIXME: increase aria radius of the button
      button.onPress.connect(() => {
        // sound.stop('menu_theme');
        // sound.play('menu_item_click1');
        _.fn();
      });

      this.menu.addChild(button);
    });
  }

  logout() {
    this.game.storage.removeItem('authToken');
    this.scene.changeScene(AuthScene);
  }

  openSettings() {}

  update(_delta: number): void {
    this.handleInput();
  }

  resize(screenWidth: number, screenHeight: number): void {
    this.menu.x = screenWidth / 2;
    this.menu.y = screenHeight / 2.3;

    this.background.width = screenWidth;
    this.background.height = screenHeight;

    handleProgramVersionResize(this.version, screenWidth, screenHeight);
    handleSocialMediaIconsResize(this.socialMediaIcons, screenWidth, screenHeight);
  }
}
