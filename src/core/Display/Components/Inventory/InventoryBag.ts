import { theme } from '@config';
import { getScreenWidth } from '@utils';
import { InventoryDraft } from '@core/Display';

export class InventoryBag extends InventoryDraft {
  protected backgroundColor = theme.background.primary;

  protected slotFillColor = theme.chest.shared.background;
  protected slotBorderColor = theme.chest.shared.border;

  constructor() {
    super();

    this.defineLocation((getScreenWidth() - this.width) / 2, 10);
  }

  protected defineResizeStrategy(screenWidth: number, _screenHeight: number) {
    this.x = (screenWidth - this.width) / 2;
    this.y = 10;
  }
}
