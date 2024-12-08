import { theme } from '@config';
import { Application, Ticker } from 'pixi.js';
import { GameManager, SceneManager } from '@core/Managers';
import { InitialScene } from '@core/Scenes';

export class App {
  private readonly app: Application;
  private readonly game: GameManager;
  private readonly scene: SceneManager;

  constructor() {
    this.app = new Application();
    this.game = new GameManager();
    this.scene = new SceneManager();

    this.scene.setApplication(this.app);

    // Expose the application globally for debugging purposes.
    // @ts-ignore
    globalThis.__PIXI_APP__ = this.app;

    this.app
      .init({
        resizeTo: window,
        autoDensity: true,
        background: theme.neutral.black,
        resolution: window.devicePixelRatio || 1,
      })
      .then(() => {
        document.body.appendChild(this.app.canvas);
        this.app.ticker.add(this.loop.bind(this));
        this.scene.changeScene(new InitialScene());
      });
  }

  loop(ticker: Ticker) {
    this.game.hud.update(ticker.deltaTime);
    this.scene.update(ticker.deltaTime);
  }
}
