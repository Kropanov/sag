import { FANCY_BUTTON_BASE_ANIMATION, theme } from '@config';
import { ContainerChild, Container, Text } from 'pixi.js';
import { FancyButton, List } from '@pixi/ui';
import { GameManager, SceneManager } from '@core/Managers';
import { UIComponent } from '@interfaces';
import { MenuScene } from '@core/Scenes';
import { MenuItemsType } from '@types';
import { HUDComponent } from '@core/Display';

class SettingsMenu extends HUDComponent {
  private game: GameManager = new GameManager();
  private scene: SceneManager = new SceneManager();

  private menu!: List;
  private items: Array<MenuItemsType> = [
    { text: 'Save', fn: () => this.savePlayerData() },
    { text: 'General', fn: () => {} },
    { text: 'Interface', fn: () => {} },
    { text: 'Controls', fn: () => {} },
    { text: 'Save & Exit', fn: () => this.navigateToMainMenu() },
  ];

  public render(): Array<ContainerChild> {
    this.menu = new List({
      elementsMargin: 10,
      type: 'vertical',
    });

    this.populateMenuWithButtons();

    this.resize(this.game.size.getWidth(), this.game.size.getHeight());

    return [this.menu];
  }

  public getContainer(): Container {
    return this.menu;
  }

  private populateMenuWithButtons() {
    this.items.map((_) => {
      const button = new FancyButton({
        text: new Text({
          text: _.text,
          style: {
            fontSize: 25,
            fill: theme.neutral.white,
            align: 'center',
          },
        }),
        animations: FANCY_BUTTON_BASE_ANIMATION,
      });

      button.onPress.connect(() => {
        _.fn();
      });

      this.menu.addChild(button);
    });
  }

  private savePlayerData() {}

  public addComponent(_component: UIComponent): void {}

  // FIXME: I don't like this code
  public resize(_screenWidth: number, _screenHeight: number): void {
    this.menu.x = 150;
    this.menu.y = 420 / 2 - this.menu.height / 2;
  }

  public navigateToMainMenu() {
    this.scene.changeScene(new MenuScene());
  }
}

export { SettingsMenu };
