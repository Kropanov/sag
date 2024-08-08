import { GameManager } from '@/core/Manager';
import { IScene } from '@/interfaces';
import { Input } from '@pixi/ui';
import { Container, Graphics, Text } from 'pixi.js';

export class AuthScene extends Container implements IScene {
  private manager: GameManager = GameManager.getInstance();
  private container: Graphics;

  private loginInput!: Input;
  private passwordInput!: Input;

  private linkText!: Text;

  constructor() {
    super();

    this.container = new Graphics();
    this.drawContainer();

    this.drawLoginInput();
    this.drawPasswordInput();
    this.drawLinkText();
  }

  drawContainer() {
    this.container.roundRect(0, 0, 550, 650, 30).fill('#282828');

    this.container.stroke({
      color: '#FFFFFF',
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
        .roundRect(0, 0, this.container.width / 1.5, 40, 30)
        .fill('#282828')
        .stroke({
          color: '#FFFFFF',
          width: 1,
        }),
      placeholder: 'E-mail',
      maxLength: 35,
      padding: [10, 15],
      textStyle: {
        fill: '#8F8F8F',
        fontSize: 15,
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
        .roundRect(0, 0, this.container.width / 1.5, 40, 30)
        .fill('#282828')
        .stroke({
          color: '#FFFFFF',
          width: 1,
        }),
      placeholder: 'Password',
      maxLength: 35,
      padding: [10, 15],
      textStyle: {
        fill: '#8F8F8F',
        fontSize: 15,
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

  drawLinkText() {
    this.linkText = new Text({
      text: 'Already have an account? Log in',
      style: {
        fontSize: 16,
        fill: '#FFFFFF',
        textBaseline: 'bottom',
      },
    });

    this.linkText.eventMode = 'dynamic';

    this.linkText.on('mouseenter', () => {
      this.linkText.style.stroke = 'blue';
    });

    this.linkText.on('mouseleave', () => {
      this.linkText.style.stroke = 0;
    });

    this.linkText.on('pointertap', () => {
      console.log('Click!');
    });

    this.linkText.y = this.container.height - 100;
    this.linkText.x = this.container.width / 2 - 108;

    this.container.addChild(this.linkText);
  }

  update(_framesPassed: number): void {}

  resize(_screenWidth: number, _screenHeight: number): void {
    this.container.position.set(this.manager.getWidth() / 2, this.manager.getHeight() / 2);
  }
}
