import { theme } from '@config';
import { InventoryDraft } from '@core/Display';

export class SharedChest extends InventoryDraft {
  protected inventoryCapacity = 36;
  protected backpackSlotIncrement = 12;

  protected backgroundColor = theme.background.primary;

  protected slotFillColor = theme.chest.shared.background;
  protected slotBorderColor = theme.chest.shared.border;

  constructor() {
    super();
    // required to refresh the graphics
    this.inventory = [];

    this.defineLocation(1100, 500);
  }

  protected defineResizeStrategy(screenWidth: number, _screenHeight: number) {
    this.x = (screenWidth - this.width) / 2;
  }
}
