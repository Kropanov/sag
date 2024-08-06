import { GameManager } from '@/core/Manager';
import { IScene } from '@/interfaces';
import { Input } from '@pixi/ui';
import { Container, Graphics } from 'pixi.js';

export class AuthScene extends Container implements IScene {
  private manager: GameManager = GameManager.getInstance();
  private container: Graphics;

  private inputLogin!: Input;

  constructor() {
    super();

    this.container = new Graphics();
    this.drawContainer();

    this.drawInputLogin();
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

  drawInputLogin() {
    this.inputLogin = new Input({
      bg: new Graphics()
        .rect(0, 0, this.container.width / 1.5, 40)
        .fill('#282828')
        .stroke({
          color: 'black',
          width: 1,
          alignment: 0.5,
        }),
      maxLength: 60,
      textStyle: {
        fill: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
      },
      align: 'center',
      value: '',
      addMask: false,
    });

    this.inputLogin.x = 100;
    this.inputLogin.y = 100;

    this.inputLogin.onChange.connect(() => {
      console.log(this.inputLogin.value);
    });

    this.container.addChild(this.inputLogin);
  }

  update(_framesPassed: number): void {}

  resize(_screenWidth: number, _screenHeight: number): void {
    this.container.position.set(this.manager.getWidth() / 2, this.manager.getHeight() / 2);
  }
}
