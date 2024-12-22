import { theme } from '@config';
import { getScreenWidth } from '@utils';
import { InventoryDraft } from '@core/Display';

export class InventoryBag extends InventoryDraft {
  protected inventoryCapacity = 10;
  protected backpackSlotIncrement = 10;

  protected slotFillColor = theme.background.secondary;
  protected slotBorderColor = theme.border.primary;

  public alwaysVisible = true;

  constructor() {
    super();

    this.defineLocation((getScreenWidth() - this.width) / 2, 10);
  }

  protected defineResizeStrategy(screenWidth: number, _screenHeight: number) {
    this.x = (screenWidth - this.width) / 2;
    this.y = 10;
  }

  public showFullInventory() {
    this.toggleInventoryExpanded();
  }
}
