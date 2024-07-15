import { ContainerChild } from 'pixi.js';

export interface IScene extends ContainerChild {
  update(framesPassed: number): void;
  resize(screenWidth: number, screenHeight: number): void;
}
