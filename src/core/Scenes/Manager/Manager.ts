import { Application, Ticker } from 'pixi.js';
import { IScene } from '../../../interfaces';

// TODO: create Singleton
export class Manager {
  private constructor() {
    /*this class is purely static. No constructor to see here*/
  }

  // Safely store variables for our game
  private static app: Application;
  private static currentScene: IScene;

  // Width and Height are read-only after creation (for now)
  private static _width: number;
  private static _height: number;

  // With getters but not setters, these variables become read-only
  public static get width(): number {
    return Manager._width;
  }
  public static get height(): number {
    return Manager._height;
  }

  // Use this function ONCE to start the entire machinery
  public static async initialize(width: number, height: number, background: string): Promise<void> {
    // store our width and height
    Manager._width = width;
    Manager._height = height;

    // Create our pixi app
    Manager.app = new Application();

    // @ts-ignore
    globalThis.__PIXI_APP__ = Manager.app;

    // background - '#1099bb'
    await Manager.app.init({ background: background, resizeTo: window });

    document.body.appendChild(Manager.app.canvas);

    // Add the ticker
    Manager.app.ticker.add(Manager.update);
  }

  // Call this function when you want to go to a new scene
  public static changeScene(newScene: IScene): void {
    // Remove and destroy old scene... if we had one..
    if (Manager.currentScene) {
      Manager.app.stage.removeChild(Manager.currentScene);
      Manager.currentScene.destroy();
    }

    // Add the new one
    Manager.currentScene = newScene;
    Manager.app.stage.addChild(Manager.currentScene);
  }

  // This update will be called by a pixi ticker and tell the scene that a tick happened
  private static update(ticker: Ticker): void {
    // Let the current scene know that we updated it...
    // Just for funzies, sanity check that it exists first.
    if (Manager.currentScene) {
      Manager.currentScene.update(ticker.deltaMS);
    }

    // as I said before, I HATE the "frame passed" approach. I would rather use `Manager.app.ticker.deltaMS`
  }
}
