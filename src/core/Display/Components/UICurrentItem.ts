import { GameManager } from '@/core/Manager';
import { UIComponent } from '@/interfaces';
import { Graphics, Sprite } from 'pixi.js';
import { UIAmmo } from './UIAmmo';

export class UICurrentItem implements UIComponent {
  private manager = GameManager.getInstance();

  private uiAmmo!: UIAmmo;
  private container!: Graphics;
  private currentItem!: Sprite;

  draw(): Array<any> {
    this.container = new Graphics().roundRect(0, 0, 300, 150, 10).fill({ color: '#0d1117f2' });
    this.container.x = this.manager.getWidth() - 300;
    this.container.zIndex = 1;

    this.currentItem = Sprite.from('pistol');
    this.currentItem.y += 8;
    this.currentItem.x = this.container.width - 150;
    this.container.addChild(this.currentItem);

    this.uiAmmo = new UIAmmo();
    this.add(this.uiAmmo);

    return [this.container];
  }

  add(component: UIComponent): void {
    for (let part of component.draw()) {
      this.container.addChild(part);
    }
  }

  setAmmo(currentValue: number | string, maxAmmo: number) {
    this.uiAmmo.setAmmo(currentValue, maxAmmo);
  }

  resize(_screenWidth: number, _screenHeight: number): void {
    return;
  }
}
