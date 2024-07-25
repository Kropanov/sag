import { sound } from '@pixi/sound';
import { Container, Text } from 'pixi.js';
import { IScene } from '../../../interfaces';
import { FancyButton, List } from '@pixi/ui';
import { GameManager } from '../../Manager/GameManager';
import { GameScene } from '../GameScene/GameScene';
import { MenuItemsType } from '../../../types';

export default class MenuScene extends Container implements IScene {
  private manager = GameManager.getInstance();

  private menu: List;
  private items: Array<MenuItemsType> = [
    { text: 'Play', scene: new GameScene() },
    { text: 'Multiplayer', scene: new GameScene() },
    { text: 'Settings', scene: new GameScene() },
    { text: 'Exit', scene: new GameScene() },
  ];

  constructor() {
    super();

    this.menu = new List({
      elementsMargin: 10,
      type: 'vertical',
    });

    this.menu.x = this.manager.getWidth() / 2;
    this.menu.y = this.manager.getHeight() / 2.3;

    this.fillMenu();

    this.addChild(this.menu);
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
      button.onPress.connect(() => this.onClickMenuItem(_.scene));

      this.menu.addChild(button);
    });
  }

  onClickMenuItem(scene: IScene) {
    sound.play('menu_item_click1');
    this.manager.changeScene(scene);
  }

  update(_delta: number): void {}

  resize(screenWidth: number, screenHeight: number): void {
    this.menu.x = screenWidth / 2;
    this.menu.y = screenHeight / 2.3;
  }
}
