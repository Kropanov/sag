import { GameManager } from '@core/Managers';
import { HoverInfo } from '@interfaces';
import { InventoryBag, InventoryHoverInfoBox, SettingsButton } from '@core/Display';

export class HUDController {
  private game: GameManager = new GameManager();

  private readonly hudBackpack: InventoryBag | undefined;
  private readonly hudHoverInfoBox: InventoryHoverInfoBox | undefined;
  private readonly settingsButton: SettingsButton | undefined;

  constructor() {
    this.hudBackpack = this.game.hud.getComponent('backpack');
    this.hudHoverInfoBox = this.game.hud.getComponent('itemInfoBox');
    this.settingsButton = this.game.hud.getComponent('settingsButton');

    if (this.hudBackpack) {
      this.hudBackpack.registerEvent('showHoverInfoBox', (hoverInfo: HoverInfo) => {
        this.hudHoverInfoBox?.showItemHoverInfo(hoverInfo);
      });

      this.hudBackpack.registerEvent('hideHoverInfoBox', ({}) => {
        this.hudHoverInfoBox?.hide();
      });
    }
  }

  handleInput() {
    if (this.game.keyboard.isKeyJustPressed('Escape')) {
      this.hudBackpack?.showFullInventory();
      this.settingsButton?.toggleSettingsVisibility();
    }
  }
}
