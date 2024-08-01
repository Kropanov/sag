import { IScene } from '@/interfaces';
import { sound } from '@pixi/sound';
import { FancyButton } from '@pixi/ui';
import { Container, FederatedEvent, Graphics, Text } from 'pixi.js';

export class GameSetupScene extends Container implements IScene {
  private nextButton!: FancyButton;
  private backButton!: FancyButton;

  constructor() {
    super();

    // FIXME: it will be fixed by refactoring next time
    const container1 = new Graphics();
    container1.rect(50, 200, 400, 600).fill({ color: '#00b1dd' });
    const text1 = new Text({
      text: 'Standard',
      style: {
        fontSize: 25,
        align: 'center',
      },
    });
    text1.x = 50 + (400 - text1.width) / 2;
    text1.y = 200 + 600 - text1.height - 10;

    container1.eventMode = 'dynamic';
    // container1.on('mousemove', this.onMouseEnter.bind(this, container1));
    container1.addChild(text1);
    this.addChild(container1);

    const container2 = new Graphics();
    container2.rect(500, 200, 400, 600).fill({ color: '#00b1dd' });
    const text2 = new Text({
      text: 'Custom',
      style: {
        fontSize: 25,
        align: 'center',
      },
    });
    text2.x = 500 + (400 - text2.width) / 2;
    text2.y = 200 + 600 - text2.height - 10;
    container2.addChild(text2);

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

  hover(context: FederatedEvent) {
    console.log(context.pageX, context.pageY);
  }

  next() {}

  update(_framesPassed: number): void {}
  resize(_screenWidth: number, _screenHeight: number): void {}
}
