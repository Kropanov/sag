import { UIComponent } from '@/interfaces';
import { ContainerChild, Container } from 'pixi.js';

export class NotificationWidget {
  private container: Container;

  constructor() {
    this.container = new Container();
  }

  render(): Array<ContainerChild> {
    return [this.container];
  }

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
