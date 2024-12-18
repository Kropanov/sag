import { IScene } from '@interfaces';
import { Container } from 'pixi.js';
import { Item, Player } from '@core/Entities';
import { HUDService } from '@core/Display';

class HUDController {
  private player: Player;
  private hudService: HUDService;

  constructor(player: Player, scene: IScene) {
    this.player = player;
    this.hudService = new HUDService(scene, player);
  }

  public setUIAmmo(currentValue: number | string, maxAmmo: number) {
    this.hudService.setUIAmmo(currentValue, maxAmmo);
  }

  public setUIUsername(value: string) {
    this.hudService.setUIUsername(value);
  }

  public setUIBackpack(backpack: Array<Item> | undefined) {
    this.hudService.setUIBackpack(backpack);
  }

  public updateUIBackpack() {
    this.hudService.setUIBackpack(this.player.getBackpackItems());
  }

  public getHUDContainers(): Container[] {
    return this.hudService.getHUDContainers();
  }

  public resize(screenWidth: number, screenHeight: number) {
    this.hudService.resize(screenWidth, screenHeight);
  }

  public setCurrentItem(index: number) {
    this.hudService.setCurrentItem(index);
  }

  public showFullInventoryWithSettings() {
    this.hudService.showFullInventoryWithSettings();
  }
}

export { HUDController };
