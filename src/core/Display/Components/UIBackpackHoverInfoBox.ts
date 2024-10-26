import { UIComponent } from '@/interfaces';
import { ContainerChild, Container, Graphics, Text } from 'pixi.js';
import { Item } from '@core/Entities';
import { ITEM_RARITY_COLORS } from '@/config/item.ts';
import { ItemRarity } from '@/types/item-rarity.enum.ts';

class UIBackpackHoverInfoBox implements UIComponent {
  private readonly container!: Container;

  private graphics!: Graphics;
  private itemRarityBox!: Graphics;

  private itemName!: Text;
  private itemRarityTitle!: Text;
  private itemDescription!: Text;

  private containerWidth: number = 350;
  private containerHeight: number = 600;

  constructor() {
    this.container = new Container();
    this.container.zIndex = 6;
    this.hide();

    this.renderGraphicsContainer();
    this.renderItemName();

    this.renderItemRarityBox();
    this.renderItemRarityTitle();
    this.renderItemDescription();
  }

  public render(): Array<ContainerChild> {
    return [this.container];
  }

  public renderGraphicsContainer(): void {
    this.graphics = new Graphics();
    this.graphics.filletRect(0, 0, this.containerWidth, this.containerHeight, 10).fill('#0d1117f2');
    this.container.addChild(this.graphics);
  }

  public renderItemName(): void {
    this.itemName = new Text({
      text: '',
      style: {
        fontSize: 20,
        fill: '#ADADAD',
        fontFamily: 'Consolas',
        align: 'center',
      },
    });

    this.itemName.x = 10;
    this.itemName.y = 10;

    this.container.addChild(this.itemName);
  }

  public renderItemDescription(): void {
    this.itemDescription = new Text({
      text: '',
      style: {
        fontSize: 15,
        fill: '#ADADAD',
        fontFamily: 'Consolas',
        align: 'left',
        wordWrap: true,
        wordWrapWidth: this.containerWidth - 15,
      },
    });

    this.itemDescription.x = 10;
    this.itemDescription.y = 95;

    this.container.addChild(this.itemDescription);
  }

  public renderItemRarityBox(): void {
    this.itemRarityBox = new Graphics();
    this.itemRarityBox.filletRect(0, 0, this.containerWidth, 40, 0).fill('#3399FF');

    this.itemRarityBox.x = 0;
    this.itemRarityBox.y = 42;

    this.container.addChild(this.itemRarityBox);
  }

  public renderItemRarityTitle() {
    this.itemRarityTitle = new Text({
      text: '',
      style: {
        fontSize: 20,
        fill: '#FFF',
        fontFamily: 'Consolas',
        align: 'center',
        dropShadow: {
          alpha: 2,
          angle: Math.PI / 4,
          blur: 5,
          distance: 3,
          color: 0x000000,
        },
      },
    });

    this.itemRarityTitle.x = 10;
    this.itemRarityTitle.y = 8;

    this.itemRarityBox.addChild(this.itemRarityTitle);
  }

  public updateItemRarityBox(rarity: ItemRarity): void {
    this.itemRarityBox.clear();
    this.itemRarityBox.filletRect(0, 0, this.containerWidth, 40, 0).fill(ITEM_RARITY_COLORS[rarity]);
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
    this.itemName.text = item.name;
    this.itemRarityTitle.text = item.rarity;
    this.itemDescription.text = item.description;

    this.updateItemRarityBox(item.rarity);
  }

  public addComponent(_component: UIComponent): void {
    throw new Error('Method not implemented.');
  }

  public resize(_screenWidth: number, _screenHeight: number): void {
    throw new Error('Method not implemented.');
  }
}

export { UIBackpackHoverInfoBox };
