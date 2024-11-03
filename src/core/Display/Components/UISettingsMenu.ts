import { FANCY_BUTTON_BASE_ANIMATION, theme } from '@/config';
import { GameManager } from '@/core/Manager';
import { MenuScene } from '@/core/Scenes';
import { UIComponent } from '@/interfaces';
import { MenuItemsType } from '@/types';
import { FancyButton, List } from '@pixi/ui';
import { ContainerChild, Container, Text } from 'pixi.js';

class UISettingsMenu implements UIComponent {
  private manager: GameManager = GameManager.getInstance();

  private menu!: List;
  private items: Array<MenuItemsType> = [
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

    this.resize(this.manager.getWidth(), this.manager.getHeight());

    this.populateMenuWithButtons();

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

  public addComponent(_component: UIComponent): void {}

  public resize(_screenWidth: number, _screenHeight: number): void {
    this.menu.x = 150;
    this.menu.y = 133;
  }

  public navigateToMainMenu() {
    this.manager.changeScene(new MenuScene());
  }
}

export { UISettingsMenu };
