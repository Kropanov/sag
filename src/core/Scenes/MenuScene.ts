import { Container, Sprite, Text } from 'pixi.js';
import { IScene } from '@/interfaces';
import { FancyButton, List } from '@pixi/ui';
import { MenuItemsType } from '@/types';
import { FANCY_BUTTON_BASE_ANIMATION } from '@/config';
import { GameScene, GameSetupScene, LogInScene } from '@core/Scenes';
import { GameManager } from '@/core/Manager';
import {
  getProgramVersion,
  getSocialMediaIcons,
  handleProgramVersionResize,
  handleSocialMediaIconsResize,
} from '@/core/Misc';

export class MenuScene extends Container implements IScene {
  private manager = GameManager.getInstance();
  private background: Sprite;

  private version!: Text;
  private menu: List;

  private items: Array<MenuItemsType> = [
    { text: 'New', fn: () => this.game() },
    { text: 'Load', fn: () => {} },
    { text: 'Online', fn: () => {} },
    { text: 'Settings', fn: () => this.openSettings() },
    { text: 'Credits', fn: () => {} },
    { text: 'Log out', fn: () => this.logout() },
  ];

  private socialMediaIcons: Container;

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

    this.menu.x = this.manager.getWidth() / 2;
    this.menu.y = this.manager.getHeight() / 2.3;

    this.fillMenu();

    this.addChild(this.menu);
  }

  game() {
    this.manager.changeScene(new GameScene());
  }

  back() {
    this.manager.changeScene(new MenuScene());
  }

  gameSetup() {
    this.manager.changeScene(new GameSetupScene());
  }

  clearMenu() {
    this.items = [];
    this.menu.removeChildren();
  }

  fillMenu() {
    this.items.map((_) => {
      const button = new FancyButton({
        text: new Text({
          text: _.text,
          style: {
            fontSize: 25,
            fill: '#00b1dd',
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

  onClickMenuItem(scene: IScene) {
    this.manager.changeScene(scene);
  }

  logout() {
    this.manager.changeScene(new LogInScene());
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
