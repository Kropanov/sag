import type { AssetsManifest } from 'pixi.js';

export const manifest: AssetsManifest = {
  bundles: [
    {
      name: 'bundleName',
      assets: {
        bunny: './static/Image/bunny.png',
        sound: './static/Audio/confirmation_001.ogg',
        pluck: './static/Audio/pluck_002.ogg',
        tile: './static/Image/tile_0000.png',
        ground: './static/Image/tile_0021.png',
        tile1: './static/Image/tile_0004.png',
      },
    },
  ],
};
