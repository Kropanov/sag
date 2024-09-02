import { IScene } from '@/interfaces';
import { HUDService } from './HUDService';
import { Item } from '../Entities';

class HUDController {
  private static _instance: HUDController;
  private hudService: HUDService = new HUDService();

  constructor() {
    if (HUDController._instance) {
      return HUDController._instance;
    }

    HUDController._instance = this;
  }

  init(scene: IScene) {
    this.hudService.init(scene);
  }

  setUIAmmo(value: number | string) {
    this.hudService.setUIAmmo(value);
  }

  setUIUsername(value: string) {
    this.hudService.setUIUsername(value);
  }

  setUIBackpack(backpack: Array<Item> | undefined) {
    this.hudService.setUIBackpack(backpack);
  }

  resize(screenWidth: number, screenHeight: number) {
    this.hudService.resize(screenWidth, screenHeight);
  }
}

export { HUDController };
