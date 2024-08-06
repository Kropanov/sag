import { GameManager } from '@/core/Manager';
import { IScene } from '@/interfaces';
import { Input } from '@pixi/ui';
import { Container, Graphics } from 'pixi.js';

export class AuthScene extends Container implements IScene {
  private manager: GameManager = GameManager.getInstance();
  private container: Graphics;

  private loginInput!: Input;
  private passwordInput!: Input;

  constructor() {
    super();

    this.container = new Graphics();
    this.drawContainer();

    this.drawLoginInput();
    this.drawPasswordInput();
  }

  drawContainer() {
    this.container.rect(0, 0, 550, 650).fill('#282828');

    this.container.stroke({
      color: 'black',
      width: 1,
      alignment: 0.5,
    });

    this.container.pivot.set(275, 325);
    this.container.position.set(this.manager.getWidth() / 2, this.manager.getHeight() / 2);

    this.addChild(this.container);
  }

  drawLoginInput() {
    this.loginInput = new Input({
      bg: new Graphics()
        .rect(0, 0, this.container.width / 1.5, 40)
        .fill('#282828')
        .stroke({
          color: 'black',
          width: 1,
          alignment: 0.5,
        }),
      placeholder: 'Enter username...',
      maxLength: 35,
      padding: [5, 10],
      textStyle: {
        fill: '#8F8F8F',
        fontSize: 20,
        fontWeight: 'bold',
      },
      align: 'left',
      value: '',
      addMask: false,
    });

    this.loginInput.x = 100;
    this.loginInput.y = 100;

    this.loginInput.onChange.connect(() => {
      console.log(this.loginInput.value);
    });

    this.container.addChild(this.loginInput);
  }

  drawPasswordInput() {
    this.passwordInput = new Input({
      bg: new Graphics()
        .rect(0, 0, this.container.width / 1.5, 40)
        .fill('#282828')
        .stroke({
          color: 'black',
          width: 1,
          alignment: 0.5,
        }),
      placeholder: 'Enter password...',
      maxLength: 35,
      padding: [5, 10],
      textStyle: {
        fill: '#8F8F8F',
        fontSize: 20,
        fontWeight: 'bold',
      },
      align: 'left',
      value: '',
      addMask: false,
    });

    this.passwordInput.x = 100;
    this.passwordInput.y = 180;

    this.passwordInput.onChange.connect(() => {
      console.log(this.passwordInput.value);
    });

    this.container.addChild(this.passwordInput);
  }

  update(_framesPassed: number): void {}

  resize(_screenWidth: number, _screenHeight: number): void {
    this.container.position.set(this.manager.getWidth() / 2, this.manager.getHeight() / 2);
  }
}
