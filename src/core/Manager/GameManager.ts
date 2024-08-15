import { Application, Ticker } from 'pixi.js';
import { IScene } from '@/interfaces';

export class GameManager {
  private static _instance: GameManager;

  private app!: Application;
  private currentScene!: IScene;

  private constructor() {}

  public static getInstance(): GameManager {
    if (!GameManager._instance) {
      GameManager._instance = new GameManager();
    }

    return GameManager._instance;
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

    await this.app.init({
      background,
      resizeTo: window,
      autoDensity: true,
      resolution: window.devicePixelRatio || 1,
    });

    document.body.appendChild(this.app.canvas);
    this.app.ticker.add(this.update.bind(this));

    window.addEventListener('resize', this.resize.bind(this));
  }

  public getCurrentScene() {
    return this.currentScene;
  }

  public changeScene(newScene: IScene): void {
    if (this.currentScene) {
      this.app.stage.removeChild(this.currentScene);
      this.currentScene.destroy();
    }

    this.currentScene = newScene;
    this.app.stage.addChild(this.currentScene);
  }

  private resize(): void {
    if (this.currentScene) {
      this.currentScene.resize(this.getWidth(), this.getHeight());
    }
  }

  private update(ticker: Ticker): void {
    if (this.currentScene) {
      this.currentScene.update(ticker.deltaTime);
    }
  }
}
