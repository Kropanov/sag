import { Container, Text } from 'pixi.js';
import { IScene } from '@interfaces';
import { CircularProgressBar } from '@pixi/ui';
import { AuthScene, MenuScene } from '@core/Scenes';
import { ResourceLoader } from '@core/Entities';
import { GameManager } from '@core/Managers';
import { theme } from '@config';

export class InitialScene extends Container implements IScene {
  private game: GameManager = new GameManager();

  private loaderValue = 0;
  private isFilling: Boolean = true;

  private text!: Text;
  private loader!: CircularProgressBar;

  constructor() {
    super();

    this.renderLoader();
    this.renderLoaderText();

    this.initializeResourceLoader().then(() => {
      this.assetsLoaded();
    });
  }

  private renderLoaderText() {
    this.text = new Text({
      text: 'Initial loading...',
      style: {
        fontSize: 20,
        fill: theme.text.tertiary,
        align: 'center',
      },
    });

    this.text.x = this.game.scene.getWidth() / 2 - 64;
    this.text.y = this.game.scene.getHeight() / 2 + 55;

    this.addChild(this.text);
  }

  private renderLoader() {
    this.loader = new CircularProgressBar({
      backgroundColor: theme.background.secondary,
      backgroundAlpha: 0.4,
      lineWidth: 12,
      fillColor: theme.text.tertiary,
      fillAlpha: 0.7,
      radius: 40,
      value: 0,
      cap: 'round',
    });

    this.loader.x = this.game.scene.getWidth() / 2;
    this.loader.y = this.game.scene.getHeight() / 2;

    this.addChild(this.loader);
  }

  private async initializeResourceLoader(): Promise<void> {
    const loader = new ResourceLoader();
    await loader.load();
  }

  private assetsLoaded(): void {
    const token = this.game.storage.getToken();
    const scene = token ? new MenuScene() : new AuthScene();
    this.game.scene.changeScene(scene);
  }

  update(_framesPassed: number): void {
    this.isFilling ? this.loaderValue++ : this.loaderValue--;
    if (this.loaderValue >= 100) {
      this.isFilling = false;
    } else if (this.loaderValue <= 0) {
      this.isFilling = true;
    }

    this.loader.progress = this.loaderValue;
    this.loader.rotation += 0.1;
  }

  resize(_screenWidth: number, _screenHeight: number): void {
    this.loader.x = _screenWidth / 2;
    this.loader.y = _screenHeight / 2;

    this.text.x = _screenWidth / 2 - 64;
    this.text.y = _screenHeight / 2 + 55;
  }
}
