import type { AssetsManifest } from 'pixi.js';

export const manifest: AssetsManifest = {
  bundles: [
    {
      name: 'bundleName',
      assets: {
        bunny: './static/Image/bunny.png',
        tile: './static/Image/tile_0000.png',
        menu_item_click1: './static/Audio/click1.ogg',
        menu_item_click2: './static/Audio/click2.ogg',
        menu_item_click3: './static/Audio/click3.ogg',
        menu_item_click4: './static/Audio/click4.ogg',
        menu_item_click5: './static/Audio/click5.ogg',
        rollover: './static/Audio/rollover2.ogg',
      },
    },
  ],
};
