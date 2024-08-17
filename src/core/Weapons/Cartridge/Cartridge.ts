import { HUDController } from '@/core/Player';
import { sound } from '@pixi/sound';
import { Sprite } from 'pixi.js';

class Cartridge {
  public ammo: any = [];
  private maxAmmo: number;

  private type: string;

  private reloadTime: number;
  private isReloading: boolean = false;

  private hud = new HUDController();

  constructor(type: string, maxAmmo: number, reloadTime: number) {
    this.type = type;
    this.maxAmmo = maxAmmo;
    this.reloadTime = reloadTime;
    this.refill();
    this.hud.setUIAmmo(this.ammo.length);
  }

  shoot() {
    if (this.ammo.length === 0) {
      return null;
    }

    return this.ammo.shift();
  }

  reload(): Promise<unknown> | undefined {
    if (this.isReloading) {
      return;
    }

    this.isReloading = true;
    sound.play('recharge_cartridge');

    return new Promise((resolve) => {
      setTimeout(() => {
        this.refill();
        resolve(`Reloaded! Ammo restored to ${this.ammo.length} (type: ${this.type})`);
      }, this.reloadTime * 1000);
    });
  }

  refill() {
    this.ammo.length = 0;

    for (let i = 0; i < this.maxAmmo; i++) {
      const sprite = Sprite.from('star');

      sprite.scale.x = 0.05;
      sprite.scale.y = 0.05;

      const direction = {
        x: 0,
        y: 0,
      };

      this.ammo.push({ sprite, direction });
      this.hud.setUIAmmo(this.ammo.length);

      this.isReloading = false;
    }
  }

  getCurrentAmmo() {
    return this.ammo.length;
  }
}

export { Cartridge };
