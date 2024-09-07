import { Item, Player } from '@/core/Entities';
import { GameManager } from '@/core/Manager';
import { UIComponent } from '@/interfaces';
import { Container, Graphics, Text } from 'pixi.js';

export class UIBackpack implements UIComponent {
  private manager = GameManager.getInstance();
  private player: Player;
  private itemAmountInCell: Text = new Text();
  private cells: Array<{ item: Item | null; graphics: Graphics }> = [];
  private cellsContainer: Container;

  private backpack: Array<Item> = [];

  constructor(player: Player) {
    this.player = player;
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

      graphics.interactive = true;
      graphics.on('pointertap', () => this.onCellClick(i));

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

      this.itemAmountInCell = new Text({
        text: item.amount,
        style: {
          fontFamily: 'Consolas',
          fontSize: 15,
          fill: '#FFF',
        },
      });

      this.itemAmountInCell.zIndex = 3;
      this.itemAmountInCell.anchor.set(1, 1);
      this.itemAmountInCell.x = (cellWidth + cellSpacing) * i + cellWidth - 5;
      this.itemAmountInCell.y = 47;

      graphics.addChild(this.itemAmountInCell);
      this.cells.push({ graphics, item });
    }

    this.cellsContainer.zIndex = 1;
    this.cellsContainer.x = (this.manager.getWidth() - this.cellsContainer.width) / 2;
    this.cellsContainer.y = 20;

    return [this.cellsContainer];
  }

  onCellClick(index: number) {
    const selectedCell = this.cells[index];
    if (selectedCell.item) {
      this.removeItemFromBackpack(selectedCell.item);
    }
  }

  removeItemFromBackpack(item: Item) {
    this.player.removeItemFromBackpack(item);
    this.setBackpack(this.player.getBackpackItems());
  }

  add(_component: UIComponent): void {
    throw new Error('Method not implemented.');
  }

  // FIXME: It's not good to use the way of backpack rendering, I'll rewrite draw() and clear() in the future
  clear() {
    this.cells.length = 0;
    for (let cell of this.cells) {
      cell.graphics.destroy();
    }

    for (let el of this.cellsContainer.children) {
      el.destroy();
    }
  }

  resize(screenWidth: number, _screenHeight: number): void {
    this.cellsContainer.x = (screenWidth - this.cellsContainer.width) / 2;
    this.cellsContainer.y = 20;
  }
}
