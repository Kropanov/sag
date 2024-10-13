import { UIComponent } from '@/interfaces';
import { ContainerChild, Container, Graphics } from 'pixi.js';
import { Item } from '@core/Entities';

class UIBackpackHoverInfoBox implements UIComponent {
  private readonly container!: Container;
  private graphics!: Graphics;
  private item!: Item;

  private containerWidth: number = 300;
  private containerHeight: number = 600;

  constructor() {
    this.container = new Container();
    this.container.zIndex = 6;

    this.hide();
    this.renderGraphics();
  }

  public render(): Array<ContainerChild> {
    return [this.container];
  }

  public renderGraphics(): void {
    this.graphics = new Graphics();
    this.graphics
      .filletRect(0, 0, this.containerWidth, this.containerHeight, 10)
      .fill('#0d1117f2')
      .stroke({ color: '#7C838A', width: 3 });

    this.container.addChild(this.graphics);
  }

  public show(): void {
    this.container.visible = true;
  }

  public hide(): void {
    this.container.visible = false;
  }

  public getContainer(): Container {
    return this.container;
  }

  public setPosition(x: number, y: number): void {
    this.container.x = x;
    this.container.y = y;
  }

  public setItem(i: Item): void {
    this.item = i;
    console.log(this.item);
  }

  public addComponent(_component: UIComponent): void {
    throw new Error('Method not implemented.');
  }

  public resize(_screenWidth: number, _screenHeight: number): void {
    throw new Error('Method not implemented.');
  }
}

export { UIBackpackHoverInfoBox };
