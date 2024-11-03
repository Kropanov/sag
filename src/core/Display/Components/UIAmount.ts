import { UIComponent } from '@/interfaces';
import { ContainerChild, Container, Text } from 'pixi.js';
import { theme } from '@/config';

export class UIAmount implements UIComponent {
  private amount: number = 0;

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

    // const qty = Sprite.from('qty_v4');
    // qty.scale.set(0.45);
    // qty.x += 35;
    // qty.y += 75;
    // qty.zIndex = 1;

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
