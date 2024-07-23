import { Container, Text } from 'pixi.js';
import { IScene } from '../../../interfaces';
import { FancyButton, List } from '@pixi/ui';
import { GameManager } from '../../Manager/GameManager';

export default class MenuScene extends Container implements IScene {
  private manager = GameManager.getInstance();

  private menu: List;
  private items: Array<string> = ['Play', 'Multiplayer', 'Settings', 'Exit'];

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
          text: _,
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
      this.menu.addChild(button);
    });
  }

  update(_delta: number): void {}

  resize(screenWidth: number, screenHeight: number): void {
    this.menu.x = screenWidth / 2;
    this.menu.y = screenHeight / 2.3;
  }
}
