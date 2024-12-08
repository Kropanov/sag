import { Assets } from 'pixi.js';
import { manifest } from '@config';
import { GameFactory } from '@core/Entities';
// import { AmmoCounter } from '@core/Display';
// import { GameManager } from '@core/Managers';

export class ResourceLoader {
  // private game = new GameManager();

  constructor() {}

  public async load() {
    // Game Assets
    await Assets.init({ manifest: manifest });
    const bundleIds = manifest.bundles.map((bundle) => bundle.name);
    await Assets.loadBundle(bundleIds);

    // Templates
    const gameFactory = new GameFactory();
    await gameFactory.loadTemplates();

    // TODO: components
    // const ammoCounter = new AmmoCounter();
    // this.game.hud.addComponent('ammo', ammoCounter);
    // const test = this.game.hud.getComponent('ammo');
    // test?.hideAmmo();
  }
}
