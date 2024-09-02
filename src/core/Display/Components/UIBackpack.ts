import { GameManager } from '@/core/Manager';
import { UIComponent } from '@/interfaces';
import { Container, Graphics } from 'pixi.js';

export class UIBackpack implements UIComponent {
  private manager = GameManager.getInstance();

  private cells: any = [];
  private cellsContainer: Container;

  constructor() {
    this.cellsContainer = new Container();
  }

  draw(): Array<any> {
    this.cellsContainer = new Container();

    const cellWidth = 50;
    const cellSpacing = 10;
    const cellCount = 8;

    for (let i = 0; i < cellCount; i++) {
      const cell = new Graphics()
        .roundRect((cellWidth + cellSpacing) * i, 0, cellWidth, cellWidth, 10)
        .fill('#202325')
        .stroke({
          color: '#7C838A',
          width: 2,
        });

      cell.zIndex = 1;
      this.cellsContainer.addChild(cell);
      this.cells.push(cell);
    }

    this.cellsContainer.zIndex = 1;
    this.cellsContainer.x = (this.manager.getWidth() - this.cellsContainer.width) / 2;
    this.cellsContainer.y = 20;

    return [this.cellsContainer];
  }

  resize(screenWidth: number, _screenHeight: number): void {
    this.cellsContainer.x = (screenWidth - this.cellsContainer.width) / 2;
    this.cellsContainer.y = 20;
  }
}
