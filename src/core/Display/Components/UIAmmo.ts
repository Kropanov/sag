import { UIComponent } from '@/interfaces';
import { Container, ContainerChild, Text } from 'pixi.js';

export class UIAmmo implements UIComponent {
  private ammo: Text;

  constructor() {
    this.ammo = new Text();
  }

  public render(): Array<ContainerChild> {
    return this.createAmmoDisplay();
  }

  private createAmmoDisplay() {
    this.ammo = new Text({
      text: '',
      style: {
        fontFamily: 'Consolas',
        fontSize: 27,
        fill: '#ADADAD',
      },
    });

    this.ammo.x += 40;
    this.ammo.y += 95;
    this.ammo.zIndex = 1;

    return [this.ammo];
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

  public setAmmo(currentValue: number | string, maxAmmo: number) {
    this.ammo.text = `${currentValue}/${maxAmmo}`;
  }
}
