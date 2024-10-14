import { UIComponent } from '@/interfaces';
import { ContainerChild, Container, Graphics, Text } from 'pixi.js';
import { Item } from '@core/Entities';

class UIBackpackHoverInfoBox implements UIComponent {
  private title!: Text;
  private graphics!: Graphics;
  private readonly container!: Container;

  private containerWidth: number = 350;
  private containerHeight: number = 600;

  constructor() {
    this.container = new Container();
    this.container.zIndex = 6;
    this.hide();

    this.renderGraphicsContainer();
    this.renderItemTitle();
  }

  public render(): Array<ContainerChild> {
    return [this.container];
  }

  public renderGraphicsContainer(): void {
    this.graphics = new Graphics();
    this.graphics.filletRect(0, 0, this.containerWidth, this.containerHeight, 10).fill('#0d1117f2');
    this.container.addChild(this.graphics);
  }

  public renderItemTitle(): void {
    this.title = new Text({
      text: '',
      style: {
        fontSize: 20,
        fill: '#ADADAD',
        fontFamily: 'Consolas',
        align: 'center',
      },
    });

    this.title.x = 15;
    this.title.y = 10;

    this.container.addChild(this.title);
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

  public setItem(item: Item): void {
    this.title.text = item.name;
  }

  public addComponent(_component: UIComponent): void {
    throw new Error('Method not implemented.');
  }

  public resize(_screenWidth: number, _screenHeight: number): void {
    throw new Error('Method not implemented.');
  }
}

export { UIBackpackHoverInfoBox };
