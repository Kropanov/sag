import { Item } from '@/core/Entities';
import { GameManager } from '@/core/Manager';
import { UIComponent } from '@/interfaces';
import { Container, Graphics } from 'pixi.js';

export class UIBackpack implements UIComponent {
  private manager = GameManager.getInstance();

  private cells: Array<{ item: Item | null; graphics: Graphics }> = [];
  private cellsContainer: Container;

  private backpack: Array<Item> = [];

  constructor() {
    this.cellsContainer = new Container();
    this.cellsContainer.sortableChildren = true;
  }

  setBackpack(newBackpack: Array<Item> | undefined) {
    this.backpack = newBackpack ?? [];
    this.draw();
  }

  draw(): Array<any> {
    this.clear();

    const cellWidth = 50;
    const cellSpacing = 10;
    const cellCount = 8;

    for (let i = 0; i < cellCount; i++) {
      const graphics = new Graphics()
        .roundRect((cellWidth + cellSpacing) * i, 0, cellWidth, cellWidth, 10)
        .fill('#202325')
        .stroke({
          color: '#7C838A',
          width: 2,
        });

      graphics.zIndex = 1;
      this.cellsContainer.addChild(graphics);

      if (this.backpack.length === 0 || this.backpack.length <= i) {
        this.cells.push({ graphics, item: null });
        continue;
      }

      const item = this.backpack[i];
      const scaleFactor = 50 / 128;

      item.sprite.zIndex = 2;
      item.sprite.x = (cellWidth + cellSpacing) * i;
      item.sprite.scale.set(scaleFactor);

      this.cellsContainer.addChild(item.sprite);

      this.cells.push({ graphics, item });
    }

    this.cellsContainer.zIndex = 1;
    this.cellsContainer.x = (this.manager.getWidth() - this.cellsContainer.width) / 2;
    this.cellsContainer.y = 20;

    return [this.cellsContainer];
  }

  add(_component: UIComponent): void {
    throw new Error('Method not implemented.');
  }

  // FIXME: It's not good to use the way of backpack rendering, I'll rewrite draw() and clear() in the future
  clear() {
    for (let cell of this.cells) {
      cell.graphics.destroy();
    }
  }

  resize(screenWidth: number, _screenHeight: number): void {
    this.cellsContainer.x = (screenWidth - this.cellsContainer.width) / 2;
    this.cellsContainer.y = 20;
  }
}