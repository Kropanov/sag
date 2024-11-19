import { sound } from '@pixi/sound';
import { Ammo } from './Ammo';
import { AMMO_TYPE } from '@/enums';
import { HUDController } from '@/core/Display';

export class Cartridge {
  private type: AMMO_TYPE;
  private bullets: Ammo[];
  private maxAmmo: number;

  private reloadTime: number;
  private isReloading: boolean = false;
  private hudController: HUDController;

  constructor(maxAmmo: number, type: AMMO_TYPE, reloadTime: number, hudController: HUDController) {
    this.type = type;
    this.bullets = [];
    this.maxAmmo = maxAmmo;
    this.reloadTime = reloadTime;
    this.hudController = hudController;

    this.fill();
    this.hudController.setUIAmmo(this.bullets.length, this.maxAmmo);
  }

  getBullets() {
    return this.bullets;
  }

  shoot() {
    if (this.bullets.length === 0) {
      return 0;
    }

    this.bullets.shift();

    return this.bullets.length;
  }

  reload(): Promise<unknown> | undefined {
    if (this.isReloading) {
      return;
    }

    this.isReloading = true;
    sound.play('recharge_cartridge');

    return new Promise((resolve) => {
      setTimeout(() => {
        this.fill();
        resolve(`Reloaded! Ammo restored to ${this.bullets.length} (type: ${this.type})`);
      }, this.reloadTime * 1000);
    });
  }

  fill() {
    this.bullets.length = 0;

    for (let i = 0; i < this.maxAmmo; i++) {
      const ammo = new Ammo(this.type);
      this.bullets.push(ammo);
    }

    this.hudController.setUIAmmo(this.bullets.length, this.maxAmmo);
    this.isReloading = false;
  }

  getCurrentAmmo() {
    return this.bullets.length;
  }

  getMaxAmmo() {
    return this.maxAmmo;
  }
}
