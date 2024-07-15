import { Container, Graphics, Assets } from 'pixi.js';
import { manifest } from '../../../assets/Assets';
import { Manager } from '../Manager/Manager';
import { IScene } from '../../../interfaces';
import { GameScene } from '../GameScene/GameScene';

export class LoaderScene extends Container implements IScene {
  // for making our loader graphics...
  private loaderBar: Container;
  private loaderBarBoder: Graphics;
  private loaderBarFill: Graphics;

  constructor() {
    super();

    const manager = Manager.getInstance();
    const loaderBarWidth = manager.getWidth() * 0.8;

    this.loaderBarFill = new Graphics();
    this.loaderBarFill.beginFill(0x008800, 1);
    this.loaderBarFill.drawRect(0, 0, loaderBarWidth, 50);
    this.loaderBarFill.endFill();
    this.loaderBarFill.scale.x = 0;

    this.loaderBarBoder = new Graphics();
    this.loaderBarBoder.lineStyle(10, 0x0, 1);
    this.loaderBarBoder.drawRect(0, 0, loaderBarWidth, 50);

    this.loaderBar = new Container();
    this.loaderBar.addChild(this.loaderBarFill);
    this.loaderBar.addChild(this.loaderBarBoder);
    this.loaderBar.position.x = (manager.getWidth() - this.loaderBar.width) / 2;
    this.loaderBar.position.y = (manager.getHeight() - this.loaderBar.height) / 2;
    this.addChild(this.loaderBar);

    this.initializeLoader().then(() => {
      this.gameLoaded();
    });
  }
  resize(screenWidth: number, screenHeight: number): void {
    throw new Error('Method not implemented.');
  }

  private async initializeLoader(): Promise<void> {
    await Assets.init({ manifest: manifest });
    const bundleIds = manifest.bundles.map((bundle) => bundle.name);
    await Assets.loadBundle(bundleIds, this.downloadProgress.bind(this));
  }

  private downloadProgress(progressRatio: number): void {
    this.loaderBarFill.scale.x = progressRatio;
  }

  private gameLoaded(): void {
    const manager = Manager.getInstance();
    manager.changeScene(new GameScene());
  }

  public update(_framesPassed: number): void {
    // To be a scene we must have the update method even if we don't use it.
  }
}
