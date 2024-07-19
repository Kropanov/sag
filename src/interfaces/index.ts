import { ContainerChild } from 'pixi.js';

export interface IScene extends ContainerChild {
  update(framesPassed: number): void;
  resize(screenWidth: number, screenHeight: number): void;
}

export interface IPlayer {
  init(): void;
  sync(): void;
  draw(gameScene: IScene): void;
  close(): void;
}
