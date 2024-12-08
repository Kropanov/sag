import { Assets } from 'pixi.js';
import { manifest } from '@config';
import { GameFactory } from '@core/Entities';

export class ResourceLoader {
  constructor() {}

  public async load() {
    // Game Assets
    await Assets.init({ manifest: manifest });
    const bundleIds = manifest.bundles.map((bundle) => bundle.name);
    await Assets.loadBundle(bundleIds);

    // Templates
    const gameFactory = new GameFactory();
    await gameFactory.loadTemplates();
  }
}
