import { IScene } from '@/interfaces';
import { HUDClient } from './HUDClient';
import { Item } from '../Entities';

export class HUDService {
  private static _instance: HUDService;
  private hudClient: HUDClient = new HUDClient();

  constructor() {
    if (HUDService._instance) {
      return HUDService._instance;
    }

    HUDService._instance = this;
  }

  init(scene: IScene) {
    this.hudClient.initHUD(scene);
  }

  setUIAmmo(value: number | string) {
    this.hudClient.setUIAmmo(value);
  }

  setUIUsername(value: string) {
    this.hudClient.setUIUsername(value);
  }

  setUIBackpack(backpack: Array<Item> | undefined) {
    this.hudClient.setUIBackpack(backpack);
  }

  resize(screenWidth: number, screenHeight: number) {
    this.hudClient.resize(screenWidth, screenHeight);
  }
}
