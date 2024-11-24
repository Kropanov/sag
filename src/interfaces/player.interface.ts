import { IScene } from '@/interfaces';

export interface IPlayer {
  init(): void;
  sync(framesPassed: number): void;
  draw(gameScene: IScene): void;
}
