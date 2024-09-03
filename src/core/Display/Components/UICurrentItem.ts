import { GameManager } from '@/core/Manager';
import { UIComponent } from '@/interfaces';
import { Graphics, Sprite } from 'pixi.js';

export class UICurrentItem implements UIComponent {
  private container: Graphics;
  private manager = GameManager.getInstance();

  private currentItem!: Sprite;

  constructor() {
    this.container = new Graphics().roundRect(0, 0, 300, 150, 10).fill({ color: '#0d1117f2' });
    this.container.zIndex = 1;
  }

  draw(): Array<any> {
    this.container.x = this.manager.getWidth() - 300;

    this.currentItem = Sprite.from('pistol');
    this.currentItem.x = this.container.width - 150;
    this.container.addChild(this.currentItem);

    return [this.container];
  }

  resize(_screenWidth: number, _screenHeight: number): void {
    return;
  }
}
