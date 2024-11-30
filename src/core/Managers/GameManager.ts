import { AudioManager, HUDManager, NotifyManager, SceneManager } from '@core/Managers';

/**
 * Centralized manager for core game systems such as audio, HUD, and scenes.
 *
 * This class acts as a container for other managers and provides an entry point
 * for accessing and controlling various game systems in a cohesive manner.
 */
export class GameManager {
  /**
   * Instance responsible for managing audio functionalities.
   * Provides control over sound effects, background music, and volume settings.
   * @type {AudioManager}
   */
  public audio: AudioManager;

  /**
   * Instance responsible for managing the Heads-Up Display (HUD).
   * Handles visual UI elements such as health bars, inventory, and so on.
   * @type {HUDManager}
   */
  public hud: HUDManager;

  /**
   * Instance responsible for managing scenes within the game.
   * Handles transitions, scene initialization, and rendering of the active scene.
   * @type {SceneManager}
   */
  public scene: SceneManager;

  /**
   * Instance responsible for managing notification in the game
   * Handles game notifications
   * @type {NotifyManager}
   */
  public notify: NotifyManager;

  /**
   * Creates an instance of `GameManager` and initializes core managers.
   *
   * Each manager is created independently and is ready to use after the `GameManager`
   * instance is constructed. This class does not enforce a singleton pattern by default.
   */
  constructor() {
    this.audio = new AudioManager();
    this.hud = new HUDManager();
    this.scene = new SceneManager();
    this.notify = new NotifyManager();
  }
}
