import { STORAGE_SLOT_SPACING, STORAGE_SLOT_WIDTH } from '@/config';
import { Item, Player } from '@/core/Entities';
import { GameManager } from '@/core/Manager';
import { UIComponent } from '@/interfaces';
import { Slots } from '@/types';
import { Container, ContainerChild, Graphics, Text } from 'pixi.js';

export class UIBackpack implements UIComponent {
  private backpack: Array<Item | null> = [];

  private slots: Slots = [];
  private slotsContainer: Container;

  private player: Player;
  private manager = GameManager.getInstance();

  private currentHoldingSlotIndex: number | undefined;
  private currentHoldingSlotItem: Item | null = null;

  constructor(player: Player) {
    this.player = player;
    this.slotsContainer = new Container();
    this.slotsContainer.sortableChildren = true;
    this.slotsContainer.zIndex = 1;
  }

  public render(): Array<ContainerChild> {
    return this.renderBackpackSlots();
  }

  public updateBackpack(newBackpack: Array<Item | null> | undefined) {
    this.backpack = newBackpack ?? [];
    this.resetBackpackSlots();
    this.renderBackpackSlots();
  }

  private renderBackpackSlots(): Array<ContainerChild> {
    for (let i = 0; i < this.backpack.length; i++) {
      const item = this.backpack[i];
      const graphics = this.createSlotGraphics(i);

      if (!item) {
        this.appendSlot(graphics);
      } else {
        this.renderItemInSlot(item, graphics, i);
        this.appendSlot(graphics, item);
        this.setCurrentItem(0);
      }
    }

    const width = this.manager.getWidth();
    const height = this.manager.getHeight();
    this.resizeSlotsContainer(width, height);

    return [this.slotsContainer];
  }

  private createSlotGraphics(index: number): Graphics {
    const graphics = new Graphics()
      .roundRect((STORAGE_SLOT_WIDTH + STORAGE_SLOT_SPACING) * index, 0, STORAGE_SLOT_WIDTH, STORAGE_SLOT_WIDTH, 10)
      .fill('#202325')
      .stroke({
        color: '#7C838A',
        width: 2,
      });

    graphics.zIndex = 1;
    graphics.interactive = true;
    graphics.on('pointertap', () => this.onSlotClick(index));

    this.slotsContainer.addChild(graphics);

    return graphics;
  }

  private updateSlotGraphics(graphics: Graphics, index: number, strokeColor: string) {
    graphics.clear();
    graphics
      .roundRect((STORAGE_SLOT_WIDTH + STORAGE_SLOT_SPACING) * index, 0, STORAGE_SLOT_WIDTH, STORAGE_SLOT_WIDTH, 10)
      .fill('#202325')
      .stroke({
        color: strokeColor,
        width: 2,
      });
  }

  private renderItemInSlot(item: Item, graphics: Graphics, index: number) {
    const scaleFactor = 50 / 128;

    item.sprite.zIndex = 2;
    item.sprite.x = (STORAGE_SLOT_WIDTH + STORAGE_SLOT_SPACING) * index;
    item.sprite.scale.set(scaleFactor);

    this.slotsContainer.addChild(item.sprite);

    const itemAmountInCell = new Text({
      text: item.amount,
      style: {
        fontFamily: 'Consolas',
        fontSize: 15,
        fill: '#FFF',
        dropShadow: {
          alpha: 1,
          angle: 1,
          blur: 1,
          distance: 2,
        },
      },
    });

    itemAmountInCell.zIndex = 3;
    itemAmountInCell.anchor.set(1, 1);
    itemAmountInCell.x = (STORAGE_SLOT_WIDTH + STORAGE_SLOT_SPACING) * index + STORAGE_SLOT_WIDTH - 3;
    itemAmountInCell.y = 50;

    graphics.addChild(itemAmountInCell);
  }

  private appendSlot(graphics: Graphics, item: Item | null = null) {
    this.slots.push({ graphics, item });
  }

  private onSlotClick(index: number) {
    const selectedCell = this.slots[index];
    if (selectedCell.item) {
      this.removeItemFromBackpack(selectedCell.item);
    }
  }

  private removeItemFromBackpack(item: Item) {
    this.player.removeItemFromBackpack(item);
    this.updateBackpack(this.player.getBackpackItems());
  }

  public getContainer(): Container {
    return this.slotsContainer;
  }

  public addComponent(_component: UIComponent): void {
    throw new Error('Method not implemented.');
  }

  public setCurrentItem(index: number): void {
    if (this.currentHoldingSlotIndex === index) {
      return;
    }

    if (this.currentHoldingSlotIndex !== undefined) {
      const graphics = this.slots[this.currentHoldingSlotIndex].graphics;
      this.updateSlotGraphics(graphics, this.currentHoldingSlotIndex, '#7C838A');
    }

    this.currentHoldingSlotIndex = index;

    const item = this.slots[index].item;
    const graphics = this.slots[index].graphics;
    this.updateSlotGraphics(graphics, this.currentHoldingSlotIndex, '#31FF6D');

    this.currentHoldingSlotItem = item;
  }

  public getCurrentItem(): Item | null {
    return this.currentHoldingSlotItem;
  }

  private resetBackpackSlots() {
    this.slots.length = 0;
    while (this.slotsContainer.children.length > 0) {
      const el = this.slotsContainer.getChildAt(0);
      this.slotsContainer.removeChild(el);
    }
  }

  private resizeSlotsContainer(screenWidth: number, _screenHeight: number) {
    this.slotsContainer.x = (screenWidth - this.slotsContainer.width) / 2;
    this.slotsContainer.y = 20;
  }

  public resize(screenWidth: number, screenHeight: number): void {
    this.resizeSlotsContainer(screenWidth, screenHeight);
  }
}
