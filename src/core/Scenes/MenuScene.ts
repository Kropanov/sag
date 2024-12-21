import { Container, Sprite, Text } from 'pixi.js';
import { IScene } from '@interfaces';
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

  constructor() {
    super();

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

    const hudBackpack = this.game.hud.getComponent('backpack');
    const hudSharedChest = this.game.hud.getComponent('chest');

    if (hudBackpack) {
      hudBackpack.entity = backpack;
      hudBackpack.inventory = backpack.open();
    }

    if (hudSharedChest) {
      hudSharedChest.entity = chest;
      hudSharedChest.inventory = chest.open();
    }
    // -----------------------------------------
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

  update(_delta: number): void {}

  resize(screenWidth: number, screenHeight: number): void {
    this.menu.x = screenWidth / 2;
    this.menu.y = screenHeight / 2.3;

    this.background.width = screenWidth;
    this.background.height = screenHeight;

    handleProgramVersionResize(this.version, screenWidth, screenHeight);
    handleSocialMediaIconsResize(this.socialMediaIcons, screenWidth, screenHeight);
  }
}
