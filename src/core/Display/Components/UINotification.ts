import { UIComponent } from '@/interfaces';
import { Container } from 'pixi.js';

export class NotificationWidget {
  private readonly container: Container;

  constructor() {
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
