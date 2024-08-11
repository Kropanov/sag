// import { sound } from '@pixi/sound';
import { Container, Text } from 'pixi.js';
import { IScene } from '@/interfaces';
import { FancyButton, List } from '@pixi/ui';
import { MenuItemsType } from '@/types';
import { FANCY_BUTTON_BASE_ANIMATION } from '@/config';
import { GameScene, GameSetupScene, SettingsScene } from '@core/Scenes';
import { GameManager } from '@/core/Manager';
import { getSocialMediaIcons, handleProgramVersionResize, handleSocialMediaIconsResize } from '@/core/Components';

export class MenuScene extends Container implements IScene {
  private manager = GameManager.getInstance();
  private version!: Text;
  private menu: List;

  private items: Array<MenuItemsType> = [
    { text: 'New', fn: () => this.gameSetup() },
    { text: 'Load', fn: () => {} },
    { text: 'Online', fn: () => {} },
    { text: 'Settings', fn: () => this.openSettings() },
    { text: 'Credits', fn: () => {} },
  ];

  private socialMediaIcons: Container;

  constructor() {
    super();

    this.socialMediaIcons = getSocialMediaIcons();
    this.addChild(this.socialMediaIcons);

    this.menu = new List({
      elementsMargin: 10,
      type: 'vertical',
    });

    this.menu.x = this.manager.getWidth() / 2;
    this.menu.y = this.manager.getHeight() / 2.3;

    this.fillMenu();
    this.drawVersion();

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
    // sound.play('menu_item_click1');
    this.manager.changeScene(scene);
  }

  drawVersion() {
    this.version = new Text({
      text: 'v0.0.0 beta',
      style: {
        fontFamily: 'Consolas',
        fontSize: 20,
        fill: '#ADADAD',
      },
    });

    handleProgramVersionResize(this.version, this.manager.getWidth(), this.manager.getHeight());

    this.addChild(this.version);
  }

  openSettings() {
    this.manager.changeScene(new SettingsScene());
  }

  update(_delta: number): void {}

  resize(screenWidth: number, screenHeight: number): void {
    this.menu.x = screenWidth / 2;
    this.menu.y = screenHeight / 2.3;

    handleProgramVersionResize(this.version, screenWidth, screenHeight);
    handleSocialMediaIconsResize(this.socialMediaIcons, screenWidth, screenHeight);
  }
}
