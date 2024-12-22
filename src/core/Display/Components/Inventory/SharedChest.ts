import { theme } from '@config';
import { InventoryDraft } from '@core/Display';

export class SharedChest extends InventoryDraft {
  protected inventoryCapacity = 24;
  protected backpackSlotIncrement = 8;

  protected backgroundColor = theme.background.primary;

  protected slotFillColor = theme.chest.shared.background;
  protected slotBorderColor = theme.chest.shared.border;

  public alwaysVisible = false;

  constructor() {
    super();
    // required to refresh the graphics
    this.inventory = [];

    this.defineLocation(1100, 400);
  }

  protected defineResizeStrategy(screenWidth: number, _screenHeight: number) {
    this.x = (screenWidth - this.width) / 2;
  }
}
