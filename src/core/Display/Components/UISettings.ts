import { GameManager } from '@/core/Manager';
import { UIComponent } from '@/interfaces';
import { ContainerChild, Container, Graphics } from 'pixi.js';

// FIXME:
const OFFSET = 1.4;

class UISettings implements UIComponent {
  private manager: GameManager = GameManager.getInstance();
  private container!: Graphics;

  public render(): Array<ContainerChild> {
    return this.renderSettingsContainer();
  }

  private renderSettingsContainer() {
    this.container = new Graphics();
    this.container.zIndex = 5;
    this.container
      .filletRect(0, 0, this.manager.getWidth() / OFFSET, this.manager.getHeight() / OFFSET, 10)
      .fill('#36393B');

    this.close();
    this.resize(this.manager.getWidth(), this.manager.getHeight());

    return [this.container];
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
    throw new Error('Method not implemented.');
  }

  public addComponent(_component: UIComponent): void {}

  public resize(_screenWidth: number, _screenHeight: number): void {
    const containerWidth = _screenWidth / OFFSET;
    const containerHeight = _screenHeight / OFFSET;

    this.container.x = (_screenWidth - containerWidth) / 2;
    this.container.y = (_screenHeight - containerHeight) / 2;
    this.container.width = containerWidth;
    this.container.height = containerHeight;
  }
}

export { UISettings };
