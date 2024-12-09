import { theme } from '@config';
import { UIComponent } from '@interfaces';
import { Container, ContainerChild, Text } from 'pixi.js';
import { HUDComponent } from '@core/Display';

export class AmmoCounter extends HUDComponent {
  private ammo: Text;

  constructor() {
    super();
    this.ammo = new Text();

    this.setNested(true);

    this.createAmmoDisplay();
    this.addChild(this.ammo);
  }

  public render(): Array<ContainerChild> {
    return this.createAmmoDisplay();
  }

  private createAmmoDisplay() {
    this.ammo = new Text({
      text: '0 / 20',
      style: {
        fontFamily: 'Consolas',
        fontSize: 27,
        fill: theme.text.primary,
      },
    });

    this.ammo.x += 40;
    this.ammo.y += 95;
    this.ammo.zIndex = 1;

    return [this.ammo];
  }

  public showAmmo() {
    this.ammo.visible = true;
  }

  public hideAmmo() {
    this.ammo.visible = false;
  }

  public getContainer(): Container {
    throw new Error('Method not implemented.');
  }

  public addComponent(_component: UIComponent): void {
    throw new Error('Method not implemented.');
  }

  public resize(_screenWidth: number, _screenHeight: number): void {}

  public setAmmo(currentValue: number | string, maxAmmo: number) {
    this.ammo.text = `${currentValue}/${maxAmmo}`;
  }
}
