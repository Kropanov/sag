import { GameManager } from '@/core/Manager';
import { UIComponent } from '@/interfaces';
import { ContainerChild, Graphics, Sprite } from 'pixi.js';
import { UIAmmo } from './UIAmmo';
import { Item } from '@/core/Entities';
import { ItemType } from '@/types/item-type.enum';
import { UIAmount } from './UIAmount';

export class UICurrentItemDisplay implements UIComponent {
  private manager = GameManager.getInstance();

  private uiAmmo!: UIAmmo;
  private container!: Graphics;
  private currentItemSprite!: Sprite;
  private currentItem!: Item | null;

  public render(): Array<ContainerChild> {
    this.container = new Graphics().roundRect(0, 0, 300, 150, 10).fill({ color: '#0d1117f2' });
    this.container.x = this.manager.getWidth() - 300;
    this.container.zIndex = 1;

    this.uiAmmo = new UIAmmo();
    this.addComponent(this.uiAmmo);

    return [this.container];
  }

  public setCurrentItem(selectedItem: Item | null | undefined) {
    if (selectedItem === undefined) {
      return;
    }

    if (selectedItem === null) {
      this.currentItem = null;
      this.resetContainer();
      return;
    }

    console.log(this.currentItem === selectedItem);
    if (this.currentItem === selectedItem) {
      return;
    }

    this.currentItem = selectedItem;

    this.resetContainer();

    this.currentItemSprite = Sprite.from(selectedItem.spriteId);
    this.currentItemSprite.y += 8;
    this.currentItemSprite.x = this.container.width - 150;
    this.container.addChild(this.currentItemSprite);

    switch (selectedItem.type) {
      case ItemType.Gun:
        this.uiAmmo = new UIAmmo();
        this.addComponent(this.uiAmmo);
        break;
      case ItemType.Artifact:
        this.renderCurrentItemAmount(selectedItem.amount);
        break;
      case ItemType.Currency:
        this.renderCurrentItemAmount(selectedItem.amount);
        break;
      default:
        break;
    }
  }

  renderCurrentItemAmount(amount: number) {
    const uiAmount = new UIAmount();
    uiAmount.setItemAmount(amount);
    this.addComponent(uiAmount);
  }

  resetContainer() {
    while (this.container.children.length > 0) {
      const children = this.container.getChildAt(0);
      this.container.removeChild(children);
    }
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
