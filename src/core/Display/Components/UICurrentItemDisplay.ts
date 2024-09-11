import { GameManager } from '@/core/Manager';
import { UIComponent } from '@/interfaces';
import { ContainerChild, Graphics, Sprite } from 'pixi.js';
import { UIAmmo } from './UIAmmo';

export class UICurrentItemDisplay implements UIComponent {
  private manager = GameManager.getInstance();

  private uiAmmo!: UIAmmo;
  private container!: Graphics;
  private currentItem!: Sprite;

  // TODO: Current item sprite

  public render(): Array<ContainerChild> {
    this.container = new Graphics().roundRect(0, 0, 300, 150, 10).fill({ color: '#0d1117f2' });
    this.container.x = this.manager.getWidth() - 300;
    this.container.zIndex = 1;

    this.currentItem = Sprite.from('pistol');
    this.currentItem.y += 8;
    this.currentItem.x = this.container.width - 150;
    this.container.addChild(this.currentItem);

    this.uiAmmo = new UIAmmo();
    this.addComponent(this.uiAmmo);

    return [this.container];
  }

  public addComponent(component: UIComponent): void {
    for (let _ of component.render()) {
      this.container.addChild(_);
    }
  }

  public getContainer() {
    return this.container;
  }

  public setAmmo(currentValue: number | string, maxAmmo: number) {
    this.uiAmmo.setAmmo(currentValue, maxAmmo);
  }

  public resize(_screenWidth: number, _screenHeight: number): void {}
}
