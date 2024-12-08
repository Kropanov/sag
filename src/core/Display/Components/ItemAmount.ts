import { theme } from '@config';
import { UIComponent } from '@interfaces';
import { ContainerChild, Container, Text } from 'pixi.js';
import { HUDComponent } from '@core/Display';

export class ItemAmount extends HUDComponent {
  private amount: number = 0;

  constructor() {
    super();
  }

  render(): Array<ContainerChild> {
    return this.createAmountDisplay();
  }

  private createAmountDisplay() {
    const itemAmount = new Text({
      text: `qty: ${this.amount}`,
      style: {
        fontFamily: 'Consolas',
        fontSize: 20,
        fill: theme.text.primary,
      },
    });

    itemAmount.x += 47;
    itemAmount.y += 97;
    itemAmount.zIndex = 1;

    return [itemAmount];
  }

  public setItemAmount(value: number) {
    this.amount = value;
  }

  public getContainer(): Container {
    throw new Error('Method not implemented.');
  }

  public addComponent(_component: UIComponent): void {
    throw new Error('Method not implemented.');
  }

  public resize(_screenWidth: number, _screenHeight: number): void {
    throw new Error('Method not implemented.');
  }
}
