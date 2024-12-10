import { Text } from 'pixi.js';
import { theme } from '@config';
import { HUDComponent } from '@core/Display';
import { GameManager } from '@core/Managers';

export class AmmoCounter extends HUDComponent {
  private game: GameManager = new GameManager();
  private ammo: Text;

  constructor() {
    super();
    this.ammo = new Text();

    this.zIndex = 2;

    this.render();
    this.addChild(this.ammo);
  }

  private render() {
    this.ammo = new Text({
      text: '0 / 20',
      style: {
        fontFamily: 'Consolas',
        fontSize: 27,
        fill: theme.text.primary,
      },
    });

    this.x = this.game.size.getWidth() - 300;

    this.ammo.x += 40;
    this.ammo.y += 95;
  }

  public setAmmo(currentValue: number | string, maxAmmo: number) {
    this.ammo.text = `${currentValue}/${maxAmmo}`;
  }

  public resize(_screenWidth: number, _screenHeight: number): void {}
}
