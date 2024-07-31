import { IScene } from '@/interfaces';
import { sound } from '@pixi/sound';
import { FancyButton } from '@pixi/ui';
import { Container, Graphics, Text } from 'pixi.js';

export class GameSetupScene extends Container implements IScene {
  private nextButton!: FancyButton;
  private backButton!: FancyButton;

  constructor() {
    super();

    const container1 = new Graphics();
    container1.rect(50, 200, 400, 600).fill({ color: '#00b1dd' });
    this.addChild(container1);

    const container2 = new Graphics();
    container2.rect(500, 200, 400, 600).fill({ color: '#00b1dd' });
    this.addChild(container2);

    this.drawNextButton();
    this.drawBackButton();
  }

  drawNextButton() {
    this.nextButton = new FancyButton({
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

    this.nextButton.x = 535;
    this.nextButton.y = 850;

    this.addChild(this.nextButton);

    this.nextButton.onHover.connect(() => sound.play('menu_item_click3'));
    this.nextButton.onPress.connect(() => sound.play('menu_item_click1'));
  }

  drawBackButton() {
    this.backButton = new FancyButton({
      text: new Text({
        text: 'BACK',
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

    this.backButton.x = 415;
    this.backButton.y = 850;

    this.addChild(this.backButton);
    this.backButton.onHover.connect(() => sound.play('menu_item_click3'));
    this.backButton.onPress.connect(() => sound.play('menu_item_click1'));
  }

  next() {}

  update(framesPassed: number): void {}
  resize(screenWidth: number, screenHeight: number): void {}
}
