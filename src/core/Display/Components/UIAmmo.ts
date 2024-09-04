import { UIComponent } from '@/interfaces';
import { ContainerChild, Text } from 'pixi.js';

export class UIAmmo implements UIComponent {
  private ammo!: Text;

  draw(): Array<ContainerChild> {
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

  add(_component: UIComponent): void {
    throw new Error('Method not implemented.');
  }

  resize(_screenWidth: number, _screenHeight: number): void {
    throw new Error('Method not implemented.');
  }

  setAmmo(currentValue: number | string, maxAmmo: number) {
    this.ammo.text = `${currentValue}/${maxAmmo}`;
  }
}
