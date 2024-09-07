import { IScene } from '@/interfaces';
import { HUDService } from './HUDService';
import { Item, Player } from '../Entities';

class HUDController {
  private player!: Player;
  private static _instance: HUDController;
  private hudService: HUDService = new HUDService();

  constructor(player: Player, scene: IScene) {
    if (HUDController._instance) {
      return HUDController._instance;
    }

    HUDController._instance = this;
    this.player = player;
    this.hudService.initHUD(scene, player);
  }

  setUIAmmo(currentValue: number | string, maxAmmo: number) {
    this.hudService.setUIAmmo(currentValue, maxAmmo);
  }

  setUIUsername(value: string) {
    this.hudService.setUIUsername(value);
  }

  setUIBackpack(backpack: Array<Item> | undefined) {
    this.hudService.setUIBackpack(backpack);
  }

  updateUIBackpack() {
    this.hudService.setUIBackpack(this.player.getBackpackItems());
  }

  resize(screenWidth: number, screenHeight: number) {
    this.hudService.resize(screenWidth, screenHeight);
  }
}

export { HUDController };
