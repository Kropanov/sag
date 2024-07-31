import { sound } from '@pixi/sound';
import { Container, Sprite, Text } from 'pixi.js';
import { IScene } from '@/interfaces';
import { FancyButton, List } from '@pixi/ui';
import { MenuItemsType } from '@/types';
import { GITHUB_REP_LINK } from '@/config';
import { GameScene, GameSetupScene, SettingsScene } from '@core/Scenes';
import { GameManager } from '@/core/Manager';

export class MenuScene extends Container implements IScene {
  private manager = GameManager.getInstance();

  private menu: List;
  private items: Array<MenuItemsType> = [
    { text: 'New', fn: () => this.gameSetup() },
    { text: 'Load', fn: () => {} },
    { text: 'Online', fn: () => {} },
    { text: 'Settings', fn: () => this.openSettings() },
    { text: 'Credits', fn: () => {} },
  ];

  private githubIcon!: Sprite;
  private versionText!: Text;

  constructor() {
    super();

    // FIXME: uncomment
    // sound.play('menu_theme');

    this.menu = new List({
      elementsMargin: 10,
      type: 'vertical',
    });

    this.menu.x = this.manager.getWidth() / 2;
    this.menu.y = this.manager.getHeight() / 2.3;

    this.fillMenu();
    this.drawVersion();
    this.drawMediaIcons();

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
        animations: {
          hover: {
            props: {
              scale: { x: 1.1, y: 1.1 },
              y: 0,
            },
            duration: 100,
          },
          pressed: {
            props: {
              scale: { x: 0.9, y: 0.9 },
              y: 10,
            },
            duration: 100,
          },
        },
      });

      button.onHover.connect(() => sound.play('menu_item_click3'));
      // FIXME: increase aria radius of the button
      button.onPress.connect(() => {
        sound.stop('menu_theme');
        sound.play('menu_item_click1');
        _.fn();
      });

      this.menu.addChild(button);
    });
  }

  onClickMenuItem(scene: IScene) {
    sound.play('menu_item_click1');
    this.manager.changeScene(scene);
  }

  drawVersion() {
    this.versionText = new Text({
      text: 'v0.0.0 beta',
      style: {
        fontFamily: 'Consolas',
        fontSize: 20,
        fill: '#ADADAD',
      },
    });

    this.versionText.x = this.manager.getWidth() - this.versionText.width - 8;
    this.versionText.y = this.manager.getHeight() - this.versionText.height - 5;

    this.addChild(this.versionText);
  }

  drawMediaIcons() {
    this.githubIcon = Sprite.from('github_white');
    this.githubIcon.scale = 0.12;

    this.githubIcon.x = 5;
    this.githubIcon.y = this.manager.getHeight() - this.githubIcon.height - 5;

    this.githubIcon.eventMode = 'dynamic';
    this.githubIcon.interactive = true;

    this.githubIcon.cursor = 'pointer';

    this.githubIcon.on('pointertap', () => {
      window.open(GITHUB_REP_LINK);
    });

    this.addChild(this.githubIcon);
  }

  openSettings() {
    this.manager.changeScene(new SettingsScene());
  }

  update(_delta: number): void {}

  resize(screenWidth: number, screenHeight: number): void {
    this.menu.x = screenWidth / 2;
    this.menu.y = screenHeight / 2.3;

    this.versionText.x = screenWidth - this.versionText.width - 8;
    this.versionText.y = screenHeight - this.versionText.height - 5;

    this.githubIcon.x = 5;
    this.githubIcon.y = this.manager.getHeight() - this.githubIcon.height - 5;
  }
}
