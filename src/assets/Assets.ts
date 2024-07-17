import type { AssetsManifest } from 'pixi.js';

export const manifest: AssetsManifest = {
  bundles: [
    {
      name: 'bundleName',
      assets: {
        bunny: './static/Image/bunny.png',
        sound: './static/Audio/confirmation_001.ogg',
        pluck: './static/Audio/pluck_002.ogg',
      },
    },
  ],
};
