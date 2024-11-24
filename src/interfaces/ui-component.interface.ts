import { Container, ContainerChild } from 'pixi.js';

export interface UIComponent {
  render(): Array<ContainerChild>;
  getContainer(): Container;
  addComponent(component: UIComponent): void;
  resize(screenWidth: number, screenHeight: number): void;
}
