import { FANCY_BUTTON_BASE_ANIMATION } from '@/config';
import { GameManager } from '@/core/Manager';
import { IScene } from '@/interfaces';
import { FancyButton, Input } from '@pixi/ui';
import { Container, Graphics, Rectangle, Sprite, Text } from 'pixi.js';
import { LogInScene } from '../LogInScene/LogInScene';
import { MenuScene } from '../MenuScene/MenuScene';
import {
  getProgramVersion,
  getSocialMediaIcons,
  handleProgramVersionResize,
  handleSocialMediaIconsResize,
} from '@/core/Components';
import { sound } from '@pixi/sound';

export class SignUpScene extends Container implements IScene {
  private manager: GameManager = GameManager.getInstance();
  private container: Graphics;
  private version: Text;

  private loginInput!: Input;
  private passwordInput!: Input;
  private passwordVerifyInput!: Input;

  private logInActionButton!: FancyButton;
  private submitSignUpButton!: FancyButton;

  private socialMediaIcons: Container;

  constructor() {
    super();

    const background = Sprite.from('auth_background_2');
    this.addChild(background);

    this.version = getProgramVersion();
    this.addChild(this.version);

    this.container = new Graphics();
    this.drawContainer();

    this.socialMediaIcons = getSocialMediaIcons();
    this.addChild(this.socialMediaIcons);

    this.drawLoginInput();
    this.drawPasswordInput();
    this.drawPasswordVerifyInput();

    this.drawLogInActionButton();
    this.drawSubmitSignUpButton();
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

  drawPasswordVerifyInput() {
    this.passwordVerifyInput = new Input({
      bg: new Graphics()
        .roundRect(0, 0, this.container.width / 1.5, 40, 30)
        .fill('#ffffff00')
        .stroke({
          color: '#FFFFFF',
          width: 1,
        }),
      placeholder: 'Repeat Password',
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

    this.passwordVerifyInput.x = 90;
    this.passwordVerifyInput.y = 260;

    this.passwordVerifyInput.onChange.connect(() => {
      console.log(this.passwordVerifyInput.value);
    });

    this.container.addChild(this.passwordVerifyInput);
  }

  drawLogInActionButton() {
    const buttonText = new Text({
      text: 'Already have an account? Log in',
      style: {
        fontSize: 18,
        fill: '#FFFFFF',
        textBaseline: 'bottom',
      },
    });

    this.logInActionButton = new FancyButton({
      text: buttonText,
      animations: FANCY_BUTTON_BASE_ANIMATION,
    });

    const padding = 5;
    const width = buttonText.width + padding * 2;
    const height = buttonText.height + padding * 2;

    this.logInActionButton.hitArea = new Rectangle(-width / 2, -height / 2, width, height);

    this.logInActionButton.eventMode = 'dynamic';

    this.logInActionButton.onPress.connect(() => {
      sound.play('auth_second_click');
      this.manager.changeScene(new LogInScene());
    });

    this.logInActionButton.onPress;

    this.logInActionButton.y = this.container.height - 100;
    this.logInActionButton.x = this.container.width / 2;

    this.container.addChild(this.logInActionButton);
  }

  drawSubmitSignUpButton() {
    this.submitSignUpButton = new FancyButton({
      defaultView: new Graphics().roundRect(0, 0, 200, 60, 30).fill('#ffffff00').stroke({
        color: '#FFFFFF',
        width: 1,
      }),
      text: new Text({
        text: 'Sign up',
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

    this.submitSignUpButton.y = this.container.height / 2 + 15;
    this.submitSignUpButton.x = this.container.width / 2 - 100;

    this.submitSignUpButton.onHover.connect(() => sound.play('auth_main_hover'));
    this.submitSignUpButton.onPress.connect(() => this.handleSignUpClick());

    this.container.addChild(this.submitSignUpButton);
  }

  handleSignUpClick() {
    sound.play('auth_main_click');
    this.manager.changeScene(new MenuScene());
  }

  update(_framesPassed: number): void {}

  resize(screenWidth: number, screenHeight: number): void {
    this.container.position.set(screenWidth / 2, screenHeight / 2);

    handleSocialMediaIconsResize(this.socialMediaIcons, screenWidth, screenHeight);
    handleProgramVersionResize(this.version, screenWidth, screenHeight);
  }
}
