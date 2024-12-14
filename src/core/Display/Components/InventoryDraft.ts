import { INITIAL_BACKPACK_CAPACITY, STORAGE_SLOT_SPACING, STORAGE_SLOT_WIDTH, theme } from '@config';
import { Graphics, Point, Text } from 'pixi.js';
import { Item } from '@core/Entities';
import { getScreenHeight, getScreenWidth, isStackable } from '@utils';
import { Slot } from '@types';
import { HUDComponent } from '@core/Display';

export class InventoryDraft extends HUDComponent {
  private _inventory: Array<Item | null> = [];
  private _inventory_capacity = 10;

  private slots: Slot[] = [];

  // private currentHoldingSlotIndex: number | undefined;
  // private currentHoldingSlotItem: Item | null = null;

  private isInventoryExpanded: boolean = false;
  private initialHoldingItemPosition: Point = new Point();

  private isDragging = false;
  private offset: Point | null = null;
  private draggedItem: Item | null = null;
  private draggedSlot: Slot | null = null;

  private selectedSlotIndex = 0;

  private timer!: NodeJS.Timeout;

  constructor() {
    super();

    this.zIndex = 1;
    this.interactive = true;
    this.sortableChildren = true;

    this.inventory = [];

    const width = getScreenWidth();
    const height = getScreenHeight();

    this.resizeSlotsContainer(width, height);

    document.addEventListener('mousedown', this.onDragStart.bind(this));
    document.addEventListener('mousemove', this.onDragMoving.bind(this));
    document.addEventListener('mouseup', this.onDragEnd.bind(this));

    this.on('pointerover', this.onSlotMouseOver.bind(this));
    this.on('pointerout', this.onSlotMouseOut.bind(this));
  }

  set inventory(newInventory: (Item | null)[] | null | undefined) {
    this._inventory = this.isEmpty(newInventory) ? this.generateEmptyBackpack() : (newInventory ?? []);
    this.refresh();
  }

  set inventory_capacity(value: number) {
    this._inventory_capacity = value;
  }

  private isEmpty(inventory: (Item | null)[] | null | undefined): boolean {
    return !inventory || inventory.length === 0;
  }

  public refresh() {
    this.resetSlots();
    this.renderSlots();
  }

  private resetSlots() {
    this.slots.length = 0;
    while (this.children.length > 0) {
      const el = this.getChildAt(0);
      this.removeChild(el);
    }
  }

  private renderSlots() {
    for (let i = 0; i < this._inventory_capacity; i++) {
      const row = Math.floor(i / this._inventory_capacity);
      const slotIndex = i % this._inventory_capacity;
      const item = this._inventory[i];
      const graphics = this.createSlotGraphics(row, slotIndex, i);

      if (!item) {
        this.appendSlot(graphics);
      } else {
        const text = isStackable(item) ? this.createSlotText(item, row, slotIndex) : null;
        this.renderItemInSlot(item, row, slotIndex);
        this.appendSlot(graphics, item, text);
      }
    }
  }

  private generateEmptyBackpack() {
    const backpack = [];
    for (let i = 0; i < INITIAL_BACKPACK_CAPACITY; i++) {
      backpack.push(null);
    }

    return backpack;
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
      .fill(theme.background.secondary)
      .stroke({
        color: theme.border.primary,
        width: 2,
      });

    graphics.zIndex = 1;
    graphics.interactive = true;
    graphics.on('pointertap', () => this.onSlotClick(slotIndex, i));

    this.addChild(graphics);

    return graphics;
  }

  // private updateSlotGraphics(graphics: Graphics, index: number, strokeColor: string) {
  //   graphics.clear();
  //   graphics
  //     .roundRect((STORAGE_SLOT_WIDTH + STORAGE_SLOT_SPACING) * index, 0, STORAGE_SLOT_WIDTH, STORAGE_SLOT_WIDTH, 10)
  //     .fill(theme.background.secondary)
  //     .stroke({
  //       color: strokeColor,
  //       width: 2,
  //     });
  // }

  private createSlotText(item: Item, row: number, slotIndex: number): Text {
    const itemAmountText = new Text({
      text: item.amount,
      style: {
        fontFamily: 'Consolas',
        fontSize: 15,
        fill: theme.text.white,
        dropShadow: {
          alpha: 1,
          angle: 1,
          blur: 1,
          distance: 2,
        },
      },
    });

    itemAmountText.zIndex = 3;
    itemAmountText.anchor.set(1, 1);
    itemAmountText.x = (STORAGE_SLOT_WIDTH + STORAGE_SLOT_SPACING) * slotIndex + STORAGE_SLOT_WIDTH - 3;
    itemAmountText.y = STORAGE_SLOT_WIDTH + row * (STORAGE_SLOT_WIDTH + STORAGE_SLOT_SPACING);

    this.addChild(itemAmountText);

    return itemAmountText;
  }

  private renderItemInSlot(item: Item, row: number, slotIndex: number) {
    const scaleFactor = 50 / 128;

    item.sprite.zIndex = 2;
    item.sprite.y = row * (STORAGE_SLOT_WIDTH + STORAGE_SLOT_SPACING);
    item.sprite.x = (STORAGE_SLOT_WIDTH + STORAGE_SLOT_SPACING) * slotIndex;
    item.sprite.scale.set(scaleFactor);

    this.addChild(item.sprite);
  }

  private onDragStart(event: MouseEvent) {
    const localPoint = this.toLocal(new Point(event.clientX, event.clientY));

    for (let index = 0; index < this.slots.length; index++) {
      const slot = this.slots[index];
      if (slot.item && slot.graphics.containsPoint(localPoint)) {
        this.isDragging = true;
        this.draggedSlot = slot;
        this.draggedItem = slot.item;
        this.draggedItem.sprite.alpha = 0.5;
        this.draggedItem.sprite.cursor = 'grabbing';
        this.initialHoldingItemPosition.set(slot.item.sprite.x, slot.item.sprite.y);

        this.hideItemAmountLabel();

        const spriteLocalPosition = this.toLocal(slot.item.sprite.getGlobalPosition());
        this.offset = new Point(localPoint.x - spriteLocalPosition.x, localPoint.y - spriteLocalPosition.y);
        return;
      }
    }
  }

  private onDragMoving(event: MouseEvent) {
    if (this.isDragging && this.draggedItem) {
      const localMousePosition = this.toLocal(new Point(event.clientX, event.clientY));

      this.draggedItem.sprite.position.x = localMousePosition.x - this.offset!.x;
      this.draggedItem.sprite.position.y = localMousePosition.y - this.offset!.y;
    }
  }

  private onDragEnd(event: MouseEvent) {
    if (this.isDragging && this.draggedItem && this.draggedSlot) {
      this.isDragging = false;
      this.draggedItem.sprite.alpha = 1;
      this.draggedItem.sprite.cursor = 'default';

      const globalPoint = new Point(event.clientX, event.clientY);
      const localPoint = this.toLocal(globalPoint);

      for (let index = 0; index < this.slots.length; index++) {
        const graphics = this.slots[index].graphics;
        const slotContainsPoint = graphics.containsPoint(localPoint);
        const slotVisible = graphics.visible;

        if (slotContainsPoint && slotVisible) {
          this.callEvent('placeItemAt', { item: this.draggedItem, index });
          this.refresh();
          return;
        }
      }

      this.draggedItem.sprite.position.x = this.initialHoldingItemPosition.x;
      this.draggedItem.sprite.position.y = this.initialHoldingItemPosition.y;

      if (this.draggedSlot.graphics.visible) {
        this.showItemAmountLabel();
      }

      this.draggedItem = null;
      this.offset = null;
    }
  }

  private onSlotMouseOver(event: MouseEvent) {
    const { clientX, clientY } = event;

    this.timer = setTimeout(() => {
      const globalPoint = new Point(clientX, clientY);
      const localPoint = this.toLocal(globalPoint);

      for (let index = 0; index < this.slots.length; index++) {
        const { graphics, item } = this.slots[index];
        const slotContainsPoint = graphics.containsPoint(localPoint);

        if (slotContainsPoint && item) {
          // this.emitter.emit('showHoverInfoBox', {
          //   targetItem: item,
          //   cursorX: clientX,
          //   cursorY: clientY,
          // });
        }
      }
    }, 2000);
  }

  private onSlotMouseOut() {
    clearTimeout(this.timer);
    // this.emitter.emit('hideHoverInfoBox');
  }

  public updateSlotVisibility() {
    if (this._inventory && this._inventory.length === 0) {
      return;
    }

    for (let i = 0; i < this._inventory.length; i++) {
      if (i >= this._inventory_capacity) {
        const item = this.slots[i].item;
        const graphics = this.slots[i].graphics;
        const text = this.slots[i].text;

        graphics.visible = this.isInventoryExpanded;

        if (item) {
          item.sprite.visible = this.isInventoryExpanded;
        }

        if (text) {
          text.visible = this.isInventoryExpanded;
        }
      }
    }
  }

  private appendSlot(graphics: Graphics, item: Item | null = null, text: Text | null = null) {
    this.slots.push({ graphics, item, text });
  }

  private onSlotClick(slotIndex: number, i: number) {
    if (this.selectedSlotIndex !== slotIndex && i <= this._inventory_capacity) {
      this.selectedSlotIndex = slotIndex;
      // this.emitter.emit('updateCurrentItem', slotIndex);
    }
  }

  private showItemAmountLabel() {
    if (this.draggedSlot && this.draggedSlot.text) {
      this.draggedSlot.text.visible = true;
    }
  }

  private hideItemAmountLabel() {
    if (this.draggedSlot && this.draggedSlot.text) {
      this.draggedSlot.text.visible = false;
    }
  }

  private resizeSlotsContainer(screenWidth: number, _screenHeight: number) {
    this.x = (screenWidth - this.width) / 2;
    this.y = 20;
  }

  public resize(screenWidth: number, _screenHeight: number): void {
    console.log('!!@!@');
    this.resizeSlotsContainer(screenWidth, _screenHeight);
  }
}
