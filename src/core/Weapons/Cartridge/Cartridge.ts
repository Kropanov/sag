import { HUDController } from '@/core/Player';
import { sound } from '@pixi/sound';
import { Ammo } from '..';
import { AMMO_TYPE } from '@/types/ammo.enum';

export class Cartridge {
  private type: AMMO_TYPE;
  private bullets: Ammo[];
  private maxAmmo: number;

  private reloadTime: number;
  private isReloading: boolean = false;

  private hud = new HUDController();

  constructor(maxAmmo: number, type: AMMO_TYPE, reloadTime: number) {
    this.type = type;
    this.bullets = [];
    this.maxAmmo = maxAmmo;
    this.reloadTime = reloadTime;

    this.fill();
    this.hud.setUIAmmo(this.bullets.length);
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

    this.hud.setUIAmmo(this.bullets.length);
    this.isReloading = false;
  }

  getCurrentAmmo() {
    return this.bullets.length;
  }
}
