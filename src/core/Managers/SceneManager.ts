import { IScene } from '@interfaces';
import { Application, Container } from 'pixi.js';
import { ResizeManager } from '@core/Managers/ResizeManager.ts';

/**
 * Manages the application's scenes and handles scene transitions, resizing, and updates.
 */
export class SceneManager {
  /**
   * Singleton instance of `SceneManager`.
   * @private
   * @type {SceneManager}
   */
  private static _instance: SceneManager;

  /**
   * PIXI.js application instance used to manage rendering and updates.
   * @private
   * @type {Application}
   */
  private app!: Application;

  /**
   * The currently active scene.
   * @private
   * @type {IScene}
   */
  private currentScene!: IScene;

  /**
   * The resize manager
   * @private
   * @type {ResizeManager}
   */
  private resizeManager: ResizeManager = new ResizeManager();

  /**
   * Creates or returns the singleton instance of `SceneManager`.
   */
  constructor() {
    if (SceneManager._instance) {
      return SceneManager._instance;
    }

    this.resizeManager.subscribe(({ width, height }) => {
      if (this.currentScene) {
        this.currentScene.resize(width, height);
      }
    });

    SceneManager._instance = this;
  }

  public setApplication(app: Application) {
    this.app = app;
  }

  /**
   * Gets the currently active scene.
   * @returns {IScene | undefined} The current scene, or `undefined` if no scene is active.
   */
  public getCurrentScene(): IScene | undefined {
    return this.currentScene;
  }

  public addToScene(component: Container) {
    console.log(component);
    console.log(this.currentScene);
    this.currentScene.addChild(component);
  }

  /**
   * Changes the active scene to a new one.
   * @param {IScene} newScene - The new scene to be activated.
   */
  public changeScene(newScene: IScene): void {
    if (this.currentScene) {
      this.app.stage.removeChild(this.currentScene);
      this.currentScene.destroy();
    }

    this.currentScene = newScene;
    console.log(this.currentScene, 1);
    this.app.stage.addChild(this.currentScene);
    console.log(2);
  }

  /**
   * Updates the current scene during each application tick.
   * @private
   * @param {number} delta - The delta time of the PIXI.js ticker instance.
   */
  public update(delta: number): void {
    if (this.currentScene) {
      this.currentScene.update(delta);
    }
  }
}
