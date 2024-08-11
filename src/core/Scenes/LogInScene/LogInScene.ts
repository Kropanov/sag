import { FANCY_BUTTON_BASE_ANIMATION } from '@/config/ui-styles';
import { GameManager } from '@/core/Manager';
import { IScene } from '@/interfaces';
import { sound } from '@pixi/sound';
import { FancyButton, Input } from '@pixi/ui';
import { Container, Graphics, Sprite, Text } from 'pixi.js';
import { SignUpScene } from '../SignUpScene/SignUpScene';
import {
  getProgramVersion,
  getSocialMediaIcons,
  handleProgramVersionResize,
  handleSocialMediaIconsResize,
} from '@/core/Components';
// import { MenuScene } from '../MenuScene/MenuScene';

export class LogInScene extends Container implements IScene {
  private manager: GameManager = GameManager.getInstance();
  private container: Graphics;
  private version: Text;

  private loginInput!: Input;
  private passwordInput!: Input;

  private signUpActionButton!: FancyButton;
  private submitLoginButton!: FancyButton;

  private socialMediaIcons: Container;

  constructor() {
    super();

    sound.play('auth_main_theme');

    const background = Sprite.from('auth_background');
    this.addChild(background);

    this.version = getProgramVersion();
    this.addChild(this.version);

    this.container = new Graphics();
    this.drawContainer();

    this.socialMediaIcons = getSocialMediaIcons();
    this.addChild(this.socialMediaIcons);

    this.drawLoginInput();
    this.drawPasswordInput();
    this.drawSignUpActionButton();
    this.drawSubmitLoginButton();
  }

  drawContainer() {
    this.container.roundRect(0, 0, 550, 650, 30).fill('#ffffff12');

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
        .fill('#ffffff00')
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

    this.loginInput.x = 90;
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
        .fill('#ffffff00')
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

    this.passwordInput.x = 90;
    this.passwordInput.y = 180;

    this.passwordInput.onChange.connect(() => {
      console.log(this.passwordInput.value);
    });

    this.container.addChild(this.passwordInput);
  }

  drawSignUpActionButton() {
    this.signUpActionButton = new FancyButton({
      text: new Text({
        text: "Don't have an account? Sign up",
        style: {
          fontSize: 18,
          fill: '#FFFFFF',
          textBaseline: 'bottom',
        },
      }),
      animations: FANCY_BUTTON_BASE_ANIMATION,
    });

    this.signUpActionButton.eventMode = 'dynamic';

    this.signUpActionButton.onPress.connect(() => {
      this.manager.changeScene(new SignUpScene());
    });

    this.signUpActionButton.onPress;

    this.signUpActionButton.y = this.container.height - 100;
    this.signUpActionButton.x = this.container.width / 2;

    this.container.addChild(this.signUpActionButton);
  }

  drawSubmitLoginButton() {
    this.submitLoginButton = new FancyButton({
      defaultView: new Graphics().roundRect(0, 0, 200, 60, 30).fill('#ffffff00').stroke({
        color: '#FFFFFF',
        width: 1,
      }),
      text: new Text({
        text: 'Log in',
        style: {
          fontSize: 20,
          fill: '#FFFFFF',
          textBaseline: 'middle',
          align: 'center',
        },
      }),
      animations: {
        hover: {
          props: {
            scale: { x: 1.15, y: 1.15 },
            y: 0,
            x: -15,
          },
          duration: 100,
        },
        pressed: {
          props: {
            scale: { x: 1, y: 1 },
            y: 15,
            x: 0,
          },
          duration: 100,
        },
      },
    });

    this.submitLoginButton.y = this.container.height / 2 - 67;
    this.submitLoginButton.x = this.container.width / 2 - 100;

    this.submitLoginButton.onPress.connect(() => this.handleLoginClick());

    this.container.addChild(this.submitLoginButton);
  }

  handleLoginClick() {
    // TODO: implement login login by getting some response form server
    // this.manager.changeScene(new MenuScene());
  }

  update(_framesPassed: number): void {}

  resize(screenWidth: number, screenHeight: number): void {
    this.container.position.set(screenWidth / 2, screenHeight / 2);

    handleSocialMediaIconsResize(this.socialMediaIcons, screenWidth, screenHeight);
    handleProgramVersionResize(this.version, screenWidth, screenHeight);
  }
}
