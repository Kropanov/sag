import { theme } from '@config';
import { UIComponent } from '@interfaces';
import { GameManager } from '@core/Managers';
import { ContainerChild, Container, Graphics } from 'pixi.js';
import { HUDComponent, SettingsItemDisplay, SettingsMenu } from '@core/Display';

class SettingsBox extends HUDComponent {
  private game: GameManager = new GameManager();

  private container!: Graphics;
  private containerWidth: number = 600;
  private containerHeight: number = 400;

  private menu!: UIComponent;
  private itemDisplay!: UIComponent;
  private sectionSeparator!: Graphics;

  public render(): Array<ContainerChild> {
    return this.renderSettings();
  }

  private renderSettings() {
    this.renderSettingsContainer();
    this.renderSectionSeparator();
    this.renderSettingsMenu();
    this.renderSettingsItemDisplay();

    return [this.container];
  }

  private renderSettingsContainer() {
    this.container = new Graphics();
    this.container.zIndex = 5;
    this.container
      .filletRect(0, 0, this.containerWidth, this.containerHeight, 10)
      .fill(theme.background.primary)
      .stroke({ color: theme.border.primary, width: 3 });
    this.resize(this.game.size.getWidth(), this.game.size.getHeight());
    this.close();

    return [this.container];
  }

  private renderSettingsMenu() {
    this.menu = new SettingsMenu();
    this.addComponent(this.menu);
  }

  private renderSettingsItemDisplay() {
    this.itemDisplay = new SettingsItemDisplay();
    this.addComponent(this.itemDisplay);
  }

  private renderSectionSeparator() {
    this.sectionSeparator = new Graphics();
    this.sectionSeparator.zIndex = 6;
    this.container.filletRect(this.containerWidth / 2, 0, 3, this.containerHeight, 10).fill(theme.border.primary);
    this.container.addChild(this.sectionSeparator);
  }

  public isWindowOpen() {
    return this.container.visible;
  }

  public open() {
    this.container.visible = true;
  }

  public close() {
    this.container.visible = false;
  }

  public getContainer(): Container {
    return this.container;
  }

  public addComponent(component: UIComponent): void {
    for (let _ of component.render()) {
      this.container.addChild(_);
    }
  }

  public resize(screenWidth: number, screenHeight: number): void {
    this.container.x = screenWidth / 2 - this.containerWidth / 2;
    this.container.y = screenHeight / 2 - this.containerHeight / 2;
  }
}

export { SettingsBox };
