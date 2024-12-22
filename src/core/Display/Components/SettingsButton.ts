import { HUDComponent } from '@core/Display';
import { FancyButton } from '@pixi/ui';
import { Text } from 'pixi.js';
import { FANCY_BUTTON_BASE_ANIMATION, theme } from '@config';
import { sound } from '@pixi/sound';
import { getScreenHeight, getScreenWidth } from '@utils';

export class SettingsButton extends HUDComponent {
  private buttonText!: Text;
  private settingsButton!: FancyButton;

  constructor() {
    super();

    this.visible = false;
    this.render();
  }

  render() {
    this.buttonText = new Text({
      text: 'Settings',
      style: {
        fontSize: 30,
        fontFamily: 'Consolas',
        fill: theme.neutral.white,
        textBaseline: 'alphabetic',
      },
    });

    this.settingsButton = new FancyButton({
      text: this.buttonText,
      animations: FANCY_BUTTON_BASE_ANIMATION,
    });

    this.settingsButton.zIndex = 5;
    this.settingsButton.eventMode = 'dynamic';
    this.settingsButton.onHover.connect(() => sound.play('main_hover_sound'));

    this.settingsButton.on('click', () => {
      sound.play('main_click_sound');
      // this.uiSettings.open();
    });

    this.resize(getScreenWidth(), getScreenHeight());

    this.addChild(this.settingsButton);
  }

  toggleSettingsVisibility() {
    this.visible = !this.visible;
  }

  resize(_screenWidth: number, _screenHeight: number) {
    this.x = _screenWidth - 100;
    this.y = _screenHeight - 40;
  }
}
