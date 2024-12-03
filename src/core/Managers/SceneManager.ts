import { Application, Ticker } from 'pixi.js';
import { IScene } from '@interfaces';

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
   * Creates or returns the singleton instance of `SceneManager`.
   */
  constructor() {
    if (SceneManager._instance) {
      return SceneManager._instance;
    }

    SceneManager._instance = this;
  }

  /**
   * Gets the current width of the viewport.
   * @returns {number} The width of the viewport.
   */
  public getWidth(): number {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  }

  /**
   * Gets the current height of the viewport.
   * @returns {number} The height of the viewport.
   */
  public getHeight(): number {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  }

  /**
   * Initializes the PIXI.js application with the given background color.
   * @param {string} background - The background color of the application.
   * @returns {Promise<void>} Resolves when the application is initialized.
   */
  public async initialize(background: string): Promise<void> {
    this.app = new Application();

    // Expose the application globally for debugging purposes.
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

  /**
   * Gets the currently active scene.
   * @returns {IScene | undefined} The current scene, or `undefined` if no scene is active.
   */
  public getCurrentScene(): IScene | undefined {
    return this.currentScene;
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
    this.app.stage.addChild(this.currentScene);
  }

  /**
   * Handles window resize events and updates the current scene's dimensions.
   * @private
   */
  private resize(): void {
    if (this.currentScene) {
      this.currentScene.resize(this.getWidth(), this.getHeight());
    }
  }

  /**
   * Updates the current scene during each application tick.
   * @private
   * @param {Ticker} ticker - The PIXI.js ticker instance.
   */
  private update(ticker: Ticker): void {
    if (this.currentScene) {
      this.currentScene.update(ticker.deltaTime);
    }
  }
}
