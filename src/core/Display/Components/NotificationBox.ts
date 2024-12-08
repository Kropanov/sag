import { Container } from 'pixi.js';
import { UIComponent } from '@interfaces';
import { HUDComponent } from '@core/Display';

export class NotificationBox extends HUDComponent {
  private readonly container: Container;

  constructor() {
    super();
    this.container = new Container();
    this.render();
  }

  render() {
    return this.container;
  }

  update() {}

  getContainer(): Container {
    throw new Error('Method not implemented.');
  }

  addComponent(_component: UIComponent): void {
    throw new Error('Method not implemented.');
  }

  resize(_screenWidth: number, _screenHeight: number): void {
    throw new Error('Method not implemented.');
  }
}
