import type { AssetsManifest } from 'pixi.js';

export const manifest: AssetsManifest = {
  bundles: [
    {
      name: 'bundleName',
      assets: {
        bunny: './static/Image/bunny.png',
        tile: './static/Image/tile_0000.png',
        github_black: './static/Image/github.png',
        github_gray: './static/Image/github-mark.png',
        github_white: './static/Image/github-mark-white.png',
        auth_main_theme: './static/Audio/Music/Night Ambient 1.wav',
        auth_background_1: './static/Image/Space_background.png',
        auth_background_2: './static/Image/Space_Background2.png',
        auth_main_click: './static/Audio/Sounds/Air_FX_Pitched_Down.wav',
        auth_main_hover: './static/Audio/Sounds/FUI Holographic Interaction Radiate.wav',
        auth_second_click: './static/Audio/Sounds/FUI Holographic Button Press-1.wav',
      },
    },
  ],
};
