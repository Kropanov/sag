import { Application, Ticker } from 'pixi.js';
import { IScene } from '../../../interfaces';

// Manager for rendering scene with loop updating
export class Manager {
  private static _instance: Manager;

  private app!: Application;
  private currentScene!: IScene;

  private width: number = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  private height: number = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  public counter: number = 0;

  private constructor() {}

  public static getInstance(): Manager {
    if (!Manager._instance) {
      Manager._instance = new Manager();
    }
    return Manager._instance;
  }

  public getWidth(): number {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  }

  public getHeight(): number {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  }

  public async initialize(background: string): Promise<void> {
    this.app = new Application();

    // @ts-ignore
    globalThis.__PIXI_APP__ = this.app;

    await this.app.init({ background: background, resizeTo: window });
    document.body.appendChild(this.app.canvas);
    this.app.ticker.add(this.update.bind(this));

    window.addEventListener('resize', this.resize);
  }

  public resize(): void {
    if (this.currentScene) {
      this.currentScene.resize(this.getWidth(), this.getHeight());
    }
  }

  public changeScene(newScene: IScene): void {
    if (this.currentScene) {
      this.app.stage.removeChild(this.currentScene);
      this.currentScene.destroy();
    }

    this.currentScene = newScene;
    this.app.stage.addChild(this.currentScene);
  }

  private update(ticker: Ticker): void {
    if (this.currentScene) {
      this.currentScene.update(ticker.deltaTime);
    }
  }
}
