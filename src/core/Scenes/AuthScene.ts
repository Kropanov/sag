import { FANCY_BUTTON_BASE_ANIMATION, theme } from '@/config';
import { GameManager } from '@/core/Manager';
import { IScene } from '@/interfaces';
import { FancyButton, Input } from '@pixi/ui';
import { Container, Graphics, Rectangle, Sprite, Text } from 'pixi.js';
import { MenuScene } from './MenuScene';
import {
  getProgramVersion,
  getSocialMediaIcons,
  handleProgramVersionResize,
  handleSocialMediaIconsResize,
} from '@/core/Misc';
import { sound } from '@pixi/sound';

export class AuthScene extends Container implements IScene {
  private container!: Graphics;
  private authFormType: 'Login' | 'Register' = 'Login';
  private manager: GameManager = GameManager.getInstance();

  private emailInput!: Input;
  private passwordInput!: Input;
  private passwordVerifyInput!: Input;
  private background: Sprite;

  private actionButton!: FancyButton;
  private submitButton!: FancyButton;

  private readonly version: Text;
  private readonly socialMediaIcons: Container;

  constructor() {
    super();

    this.background = Sprite.from('login_background');
    this.addChild(this.background);

    this.version = getProgramVersion();
    this.addChild(this.version);

    this.socialMediaIcons = getSocialMediaIcons();
    this.addChild(this.socialMediaIcons);

    this.renderContainer();
    this.renderEmailInput();
    this.renderPasswordInput();
    this.renderPasswordVerifyInput();
    this.renderActionButton();
    this.renderSubmitButton();
  }

  private renderContainer() {
    this.container = new Graphics();

    this.container.roundRect(0, 0, 550, 650, 30).fill(theme.background.tertiary);

    this.container.stroke({
      color: theme.border.secondary,
      width: 1,
      alignment: 0.5,
    });

    this.container.pivot.set(275, 325);
    this.container.position.set(this.manager.getWidth() / 2, this.manager.getHeight() / 2);

    this.addChild(this.container);
  }

  private renderEmailInput() {
    this.emailInput = new Input({
      bg: new Graphics()
        .roundRect(0, 0, this.container.width / 1.5, 40, 30)
        .fill(theme.background.transparent)
        .stroke({
          color: theme.border.secondary,
          width: 1,
        }),
      placeholder: 'E-mail',
      maxLength: 35,
      padding: [10, 15],
      textStyle: {
        fill: theme.text.primary,
        fontSize: 15,
        fontWeight: 'bold',
      },
      align: 'left',
      value: '',
      addMask: false,
    });

    this.emailInput.x = 90;
    this.emailInput.y = 100;

    this.emailInput.onChange.connect(() => {
      console.log(this.emailInput.value);
    });

    this.container.addChild(this.emailInput);
  }

  private renderPasswordInput() {
    this.passwordInput = new Input({
      bg: new Graphics()
        .roundRect(0, 0, this.container.width / 1.5, 40, 30)
        .fill(theme.background.transparent)
        .stroke({
          color: theme.border.secondary,
          width: 1,
        }),
      placeholder: 'Password',
      maxLength: 35,
      padding: [10, 15],
      textStyle: {
        fill: theme.text.primary,
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

  private renderPasswordVerifyInput() {
    this.passwordVerifyInput = new Input({
      bg: new Graphics()
        .roundRect(0, 0, this.container.width / 1.5, 40, 30)
        .fill(theme.background.transparent)
        .stroke({
          color: theme.border.secondary,
          width: 1,
        }),
      placeholder: 'Repeat Password',
      maxLength: 35,
      padding: [10, 15],
      textStyle: {
        fill: theme.text.primary,
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
    this.hidePasswordVerifyInput();
  }

  private renderActionButton() {
    const buttonText = new Text({
      text: "Don't have an account? Sign up",
      style: {
        fontSize: 18,
        fill: theme.neutral.white,
        textBaseline: 'bottom',
      },
    });

    this.actionButton = new FancyButton({
      text: buttonText,
      animations: FANCY_BUTTON_BASE_ANIMATION,
    });

    const padding = 5;
    const width = buttonText.width + padding * 2;
    const height = buttonText.height + padding * 2;

    this.actionButton.hitArea = new Rectangle(-width / 2, -height / 2, width, height);

    this.actionButton.eventMode = 'dynamic';

    this.actionButton.onPress.connect(() => {
      sound.play('main_click_sound');
      this.updateAuthFormState();
    });

    this.actionButton.y = this.container.height - 100;
    this.actionButton.x = this.container.width / 2;

    this.container.addChild(this.actionButton);
  }

  private updateAuthFormState() {
    if (this.authFormType === 'Login') {
      this.submitButton.text = 'Sign Up';
      this.actionButton.text = 'Already have an account? Log in';
      this.setBackground('signup_background');
      this.showPasswordVerifyInput();
      this.submitButton.y = this.container.height / 2 + 15;
      this.submitButton.x = this.container.width / 2 - 100;
      this.authFormType = 'Register';
    } else {
      this.submitButton.text = 'Log In';
      this.setBackground('login_background');
      this.actionButton.text = "Don't have an account? Sign up";
      this.hidePasswordVerifyInput();
      this.submitButton.y = this.container.height / 2 - 67;
      this.submitButton.x = this.container.width / 2 - 100;
      this.authFormType = 'Login';
    }
  }

  private setBackground(textureName: string) {
    if (this.background && this.background.parent) {
      this.background.parent.removeChild(this.background);
    }
    this.background = Sprite.from(textureName);
    this.addChildAt(this.background, 0);
  }

  private renderSubmitButton() {
    this.submitButton = new FancyButton({
      defaultView: new Graphics().roundRect(0, 0, 200, 60, 30).fill(theme.background.transparent).stroke({
        color: theme.border.secondary,
        width: 1,
      }),
      text: new Text({
        text: 'Log In',
        style: {
          fontSize: 20,
          fill: theme.neutral.white,
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

    this.submitButton.y = this.container.height / 2 - 67;
    this.submitButton.x = this.container.width / 2 - 100;

    this.submitButton.onHover.connect(() => sound.play('main_hover_sound'));
    this.submitButton.onPress.connect(() => this.handleSubmitButtonClick());

    this.container.addChild(this.submitButton);
  }

  private showPasswordVerifyInput() {
    this.passwordVerifyInput.visible = true;
  }

  private hidePasswordVerifyInput() {
    this.passwordVerifyInput.visible = false;
  }

  private handleSubmitButtonClick() {
    sound.play('main_click_sound');

    // TODO: implement the auth logic here

    this.manager.changeScene(new MenuScene());
  }

  public update(_framesPassed: number): void {}

  public resize(screenWidth: number, screenHeight: number): void {
    this.container.position.set(screenWidth / 2, screenHeight / 2);

    handleSocialMediaIconsResize(this.socialMediaIcons, screenWidth, screenHeight);
    handleProgramVersionResize(this.version, screenWidth, screenHeight);
  }
}
