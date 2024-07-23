import { Container, Assets, Text } from 'pixi.js';
import { manifest } from '../../../assets/Assets';
import { GameManager } from '../../Manager/GameManager';
import { IScene } from '../../../interfaces';
import { GameScene } from '../GameScene/GameScene';
import { CircularProgressBar } from '@pixi/ui';

export class LoaderScene extends Container implements IScene {
  private manager = GameManager.getInstance();

  private loaderValue = 0;
  private isFilling: Boolean = true;
  private loader: CircularProgressBar;
  private text: Text;

  constructor() {
    super();

    this.text = new Text({
      text: 'Initial loading...',
      style: {
        fontSize: 20,
        fill: '#00b1dd',
        align: 'center',
      },
    });

    this.text.x = this.manager.getWidth() / 2 - 64;
    this.text.y = this.manager.getHeight() / 2 + 55;

    this.addChild(this.text);

    this.loader = new CircularProgressBar({
      backgroundColor: '#3d3d3d',
      backgroundAlpha: 0.4,
      lineWidth: 12,
      fillColor: '#00b1dd',
      fillAlpha: 0.7,
      radius: 40,
      value: 0,
      cap: 'round',
    });

    this.loader.x = this.manager.getWidth() / 2;
    this.loader.y = this.manager.getHeight() / 2;

    this.addChild(this.text);
    this.addChild(this.loader);

    this.initializeLoader().then(() => {
      this.gameLoaded();
    });
  }

  private async initializeLoader(): Promise<void> {
    await Assets.init({ manifest: manifest });
    const bundleIds = manifest.bundles.map((bundle) => bundle.name);
    await Assets.loadBundle(bundleIds);
  }

  private gameLoaded(): void {
    const manager = GameManager.getInstance();
    manager.changeScene(new GameScene());
  }

  update(_framesPassed: number): void {
    this.isFilling ? this.loaderValue++ : this.loaderValue--;
    if (this.loaderValue >= 100) {
      this.isFilling = false;
    } else if (this.loaderValue <= 0) {
      this.isFilling = true;
    }
    console.log(this.loader.progress);
    this.loader.progress = this.loaderValue;
    this.loader.rotation += 0.1;
  }

  resize(_screenWidth: number, _screenHeight: number): void {
    this.loader.x = this.manager.getWidth() / 2;
    this.loader.y = this.manager.getHeight() / 2;

    this.text.x = this.manager.getWidth() / 2 - 64;
    this.text.y = this.manager.getHeight() / 2 + 55;
  }
}
