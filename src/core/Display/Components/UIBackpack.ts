import { BACKPACK_SLOT_INCREMENT, STORAGE_SLOT_SPACING, STORAGE_SLOT_WIDTH, theme } from '@/config';
import { Item, Player } from '@/core/Entities';
import { GameManager } from '../../Managers';
import { BackpackEvents, UIComponent } from '@/interfaces';
import { Slot } from '@/types';
import mitt, { Emitter } from 'mitt';
import { Container, ContainerChild, Graphics, Point, Text } from 'pixi.js';
import { isStackable } from '@/utils';

export class UIBackpack implements UIComponent {
  private backpack: Array<Item | null> = [];
  private emitter: Emitter<BackpackEvents>;

  private slots: Slot[] = [];
  private readonly slotsContainer: Container;

  private player: Player;
  private manager = GameManager.getInstance();

  private currentHoldingSlotIndex: number | undefined;
  private currentHoldingSlotItem: Item | null = null;

  private isInventoryExpanded: boolean = false;
  private initialHoldingItemPosition: Point = new Point();

  private isDragging = false;
  private offset: Point | null = null;
  private draggedItem: Item | null = null;
  private draggedSlot: Slot | null = null;

  private selectedSlotIndex = 0;

  private timer!: NodeJS.Timeout;

  constructor(player: Player) {
    this.emitter = mitt<BackpackEvents>();
    this.player = player;
    this.slotsContainer = new Container();
    this.slotsContainer.sortableChildren = true;
    this.slotsContainer.interactive = true;
    this.slotsContainer.zIndex = 1;

    document.addEventListener('mousedown', this.onDragStart.bind(this));
    document.addEventListener('mousemove', this.onDragMoving.bind(this));
    document.addEventListener('mouseup', this.onDragEnd.bind(this));

    this.slotsContainer.on('pointerover', this.onSlotMouseOver.bind(this));
    this.slotsContainer.on('pointerout', this.onSlotMouseOut.bind(this));
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
        const text = isStackable(item) ? this.createSlotText(item, row, slotIndex) : null;
        this.renderItemInSlot(item, row, slotIndex);
        this.appendSlot(graphics, item, text);
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
      .fill(theme.background.secondary)
      .stroke({
        color: theme.border.primary,
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
      .fill(theme.background.secondary)
      .stroke({
        color: strokeColor,
        width: 2,
      });
  }

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

    this.slotsContainer.addChild(itemAmountText);

    return itemAmountText;
  }

  private renderItemInSlot(item: Item, row: number, slotIndex: number) {
    const scaleFactor = 50 / 128;

    item.sprite.zIndex = 2;
    item.sprite.y = row * (STORAGE_SLOT_WIDTH + STORAGE_SLOT_SPACING);
    item.sprite.x = (STORAGE_SLOT_WIDTH + STORAGE_SLOT_SPACING) * slotIndex;
    item.sprite.scale.set(scaleFactor);

    this.slotsContainer.addChild(item.sprite);
  }

  private onDragStart(event: MouseEvent) {
    const localPoint = this.slotsContainer.toLocal(new Point(event.clientX, event.clientY));

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

        const spriteLocalPosition = this.slotsContainer.toLocal(slot.item.sprite.getGlobalPosition());
        this.offset = new Point(localPoint.x - spriteLocalPosition.x, localPoint.y - spriteLocalPosition.y);
        return;
      }
    }
  }

  private onDragMoving(event: MouseEvent) {
    if (this.isDragging && this.draggedItem) {
      const localMousePosition = this.slotsContainer.toLocal(new Point(event.clientX, event.clientY));

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
      const localPoint = this.slotsContainer.toLocal(globalPoint);

      for (let index = 0; index < this.slots.length; index++) {
        const graphics = this.slots[index].graphics;
        const slotContainsPoint = graphics.containsPoint(localPoint);
        const slotVisible = graphics.visible;

        if (slotContainsPoint && slotVisible) {
          this.player.reassignItemAt(this.draggedItem, index);
          this.emitter.emit('updateUIBackpack');
          this.emitter.emit('updateCurrentItem', index);

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
      const localPoint = this.slotsContainer.toLocal(globalPoint);

      for (let index = 0; index < this.slots.length; index++) {
        const { graphics, item } = this.slots[index];
        const slotContainsPoint = graphics.containsPoint(localPoint);

        if (slotContainsPoint && item) {
          this.emitter.emit('showHoverInfoBox', {
            targetItem: item,
            cursorX: clientX,
            cursorY: clientY,
          });
        }
      }
    }, 2000);
  }

  private onSlotMouseOut() {
    clearTimeout(this.timer);
    this.emitter.emit('hideHoverInfoBox');
  }

  public updateSlotVisibility() {
    if (this.backpack && this.backpack.length === 0) {
      return;
    }

    for (let i = 0; i < this.backpack.length; i++) {
      if (i >= BACKPACK_SLOT_INCREMENT) {
        const item = this.slots[i].item;
        const graphics = this.slots[i].graphics;
        const text = this.slots[i].text;

        graphics.visible = this.isInventoryExpanded;

        if (item && item !== null) {
          item.sprite.visible = this.isInventoryExpanded;
        }

        if (text && text !== null) {
          text.visible = this.isInventoryExpanded;
        }
      }
    }
  }

  private appendSlot(graphics: Graphics, item: Item | null = null, text: Text | null = null) {
    this.slots.push({ graphics, item, text });
  }

  private onSlotClick(slotIndex: number, i: number) {
    if (this.selectedSlotIndex !== slotIndex && i <= BACKPACK_SLOT_INCREMENT) {
      this.selectedSlotIndex = slotIndex;
      this.emitter.emit('updateCurrentItem', slotIndex);
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

  public addComponent(component: UIComponent): void {
    for (let _ of component.render()) {
      this.slotsContainer.addChild(_);
    }
  }

  public setCurrentItem(index: number): void {
    if (this.currentHoldingSlotIndex === index || BACKPACK_SLOT_INCREMENT <= index) {
      return;
    }

    if (this.currentHoldingSlotIndex !== undefined) {
      const graphics = this.slots[this.currentHoldingSlotIndex].graphics;
      this.updateSlotGraphics(graphics, this.currentHoldingSlotIndex, theme.border.primary);
    }

    this.currentHoldingSlotIndex = index;

    const item = this.slots[index].item;
    const graphics = this.slots[index].graphics;
    this.updateSlotGraphics(graphics, this.currentHoldingSlotIndex, theme.border.highlight);

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
