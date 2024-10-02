import { BACKPACK_SLOT_INCREMENT, STORAGE_SLOT_SPACING, STORAGE_SLOT_WIDTH } from '@/config';
import { Item, Player } from '@/core/Entities';
import { GameManager } from '@/core/Manager';
import { BackpackEvents, UIComponent } from '@/interfaces';
import { Slots } from '@/types';
import mitt, { Emitter } from 'mitt';
import { Container, ContainerChild, FederatedPointerEvent, Graphics, Point, Text } from 'pixi.js';

export class UIBackpack implements UIComponent {
  private backpack: Array<Item | null> = [];
  private emitter: Emitter<BackpackEvents>;

  private slots: Slots = [];
  private slotsContainer: Container;

  private player: Player;
  private manager = GameManager.getInstance();

  private currentHoldingSlotIndex: number | undefined;
  private currentHoldingSlotItem: Item | null = null;

  private isInventoryExpanded: boolean = false;

  private dragTarget: Item | null = null;
  private initialHoldingItemPosition: Point = new Point();

  private dragData: any = null;
  private offset: Point | null = null;

  constructor(player: Player) {
    this.emitter = mitt<BackpackEvents>();
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
      const row = Math.floor(i / BACKPACK_SLOT_INCREMENT);
      const slotIndex = i % BACKPACK_SLOT_INCREMENT;
      const item = this.backpack[i];
      const graphics = this.createSlotGraphics(row, slotIndex, i);

      if (!item) {
        this.appendSlot(graphics);
      } else {
        this.renderItemInSlot(item, graphics, row, slotIndex, i);
        this.appendSlot(graphics, item);
      }
    }

    if (this.backpack && this.backpack.length !== 0) {
      this.updateSlotVisibility();
      this.setCurrentItem(0);
    }

    const width = this.manager.getWidth();
    const height = this.manager.getHeight();
    this.resizeSlotsContainer(width, height);

    return [this.slotsContainer];
  }

  private createSlotGraphics(row: number, slotIndex: number, i: number): Graphics {
    const graphics = new Graphics()
      .roundRect(
        (STORAGE_SLOT_WIDTH + STORAGE_SLOT_SPACING) * slotIndex,
        row * (STORAGE_SLOT_WIDTH + STORAGE_SLOT_SPACING),
        STORAGE_SLOT_WIDTH,
        STORAGE_SLOT_WIDTH,
        10,
      )
      .fill('#202325')
      .stroke({
        color: '#7C838A',
        width: 2,
      });

    graphics.zIndex = 1;
    graphics.interactive = true;
    graphics.on('pointertap', () => this.onSlotClick(slotIndex, i));

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

  private renderItemInSlot(item: Item, graphics: Graphics, row: number, slotIndex: number, i: number) {
    const scaleFactor = 50 / 128;

    item.sprite.zIndex = 2;
    item.sprite.y = row * (STORAGE_SLOT_WIDTH + STORAGE_SLOT_SPACING);
    item.sprite.x = (STORAGE_SLOT_WIDTH + STORAGE_SLOT_SPACING) * slotIndex;
    item.sprite.scale.set(scaleFactor);

    // FIXME: using sprite directly is not a good thing... so we need to fix this
    item.sprite.on('pointerdown', (event) => this.onDragStart(event, item, slotIndex, i));
    item.sprite.on('pointermove', () => this.onDragMove(item));
    item.sprite.on('pointerup', (event) => this.onDragEnd(event, item));

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
    itemAmountInCell.x = (STORAGE_SLOT_WIDTH + STORAGE_SLOT_SPACING) * slotIndex + STORAGE_SLOT_WIDTH - 3;
    itemAmountInCell.y = 50;

    graphics.addChild(itemAmountInCell);
  }

  private onDragStart(event: any, item: Item, slotIndex: number, i: number) {
    this.onSlotClick(slotIndex, i);

    item.sprite.alpha = 0.5;

    if (!this.dragTarget) {
      this.initialHoldingItemPosition.set(item.sprite.x, item.sprite.y);
    }

    this.dragTarget = item;
    this.dragData = event.data;

    const newPosition = this.dragData.getLocalPosition(item.sprite.parent);

    if (!this.offset) {
      this.offset = new Point();
    }

    this.offset.set(newPosition.x - item.sprite.x, newPosition.y - item.sprite.y);
  }

  private onDragMove(item: Item) {
    if (this.dragTarget && this.dragData && this.offset) {
      const newPosition = this.dragData.getLocalPosition(item.sprite.parent);

      item.sprite.position.x = newPosition.x - this.offset.x;
      item.sprite.position.y = newPosition.y - this.offset.y;
    }
  }

  private onDragEnd(event: FederatedPointerEvent, item: Item) {
    item.sprite.alpha = 1;

    if (this.dragTarget) {
      this.dragTarget = null;
      this.dragData = null;
      this.offset = null;
    }

    const globalPoint = new Point(event.clientX, event.clientY);
    const localPoint = this.slotsContainer.toLocal(globalPoint);

    this.slots.forEach((slot) => {
      const slotIsfound = slot.graphics.containsPoint(localPoint);
      if (slotIsfound) {
        return; // FIXME: it is not working correctly
      }
    });

    item.sprite.x = this.initialHoldingItemPosition.x;
    item.sprite.y = this.initialHoldingItemPosition.y;
  }

  public updateSlotVisibility() {
    if (this.backpack && this.backpack.length === 0) {
      return;
    }

    for (let i = 0; i < this.backpack.length; i++) {
      if (i >= BACKPACK_SLOT_INCREMENT) {
        const graphics = this.slots[i].graphics;
        const item = this.slots[i].item;

        graphics.visible = this.isInventoryExpanded;
        if (item && item !== null) {
          item.sprite.visible = this.isInventoryExpanded;
        }
      }
    }
  }

  private appendSlot(graphics: Graphics, item: Item | null = null) {
    this.slots.push({ graphics, item });
  }

  private onSlotClick(slotIndex: number, i: number) {
    if (i <= BACKPACK_SLOT_INCREMENT) {
      this.emitter.emit('slotSelected', slotIndex);
    }
  }

  public on(event: keyof BackpackEvents, handler: (arg: any) => void) {
    this.emitter.on(event, handler);
  }

  // @ts-ignore
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

  public checkInventoryExpanded() {
    return this.isInventoryExpanded;
  }

  public toggleInventoryExpanded() {
    this.isInventoryExpanded = !this.isInventoryExpanded;
    this.updateSlotVisibility();
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
