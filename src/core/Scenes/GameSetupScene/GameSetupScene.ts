import { IScene } from '@/interfaces';
import { FancyButton } from '@pixi/ui';
import { Container, Graphics, Text } from 'pixi.js';

export class GameSetupScene extends Container implements IScene {
  constructor() {
    super();

    const container1 = new Graphics();
    container1.rect(50, 200, 400, 600).fill({ color: '#00b1dd' });
    this.addChild(container1);

    const container2 = new Graphics();
    container2.rect(500, 200, 400, 600).fill({ color: '#00b1dd' });
    this.addChild(container2);

    const button = new FancyButton({
      text: new Text({
        text: 'NEXT',
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

    button.x = 473;
    button.y = 850;

    this.addChild(button);
  }

  next() {}

  update(framesPassed: number): void {}
  resize(screenWidth: number, screenHeight: number): void {}
}
