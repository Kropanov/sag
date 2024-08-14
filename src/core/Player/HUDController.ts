import { IScene } from '@/interfaces';
import { GameManager } from '../Manager';
import { Text } from 'pixi.js';

class HUDController {
  private static _instance: HUDController;

  private manager = GameManager.getInstance();

  private ammo!: Text;
  private scene!: IScene;

  constructor() {
    if (HUDController._instance) {
      return HUDController._instance;
    }

    HUDController._instance = this;
  }

  setHUD(scene: IScene) {
    this.scene = scene;
    this.#drawUI();
  }

  #drawUIAmmo() {
    this.ammo = new Text({
      text: 'Some text',
      style: {
        fontFamily: 'Consolas',
        fontSize: 35,
        fill: '#ADADAD',
      },
    });

    this.ammo.x = this.manager.getWidth() - 50;
    this.ammo.y = this.manager.getHeight() - this.ammo.height - 6;

    this.scene.addChild(this.ammo);
  }

  setUIAmmo(value: number | string) {
    this.ammo.text = value;
  }

  #drawUI() {
    this.#drawUIAmmo();
  }

  resize(screenWidth: number, screenHeight: number) {
    this.ammo.x = screenWidth - 50;
    this.ammo.y = screenHeight - this.ammo.height - 6;
  }
}

export { HUDController };
