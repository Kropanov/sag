import type { AssetsManifest } from 'pixi.js';

export const manifest: AssetsManifest = {
  bundles: [
    {
      name: 'bundleName',
      assets: {
        bunny: './static/images/bunny.png',
        tile: './static/images/tile_0000.png',
        github_black: './static/icons/github.png',
        github_gray: './static/icons/github-mark.png',
        github_white: './static/icons/github-mark-white.png',
        auth_main_theme: './static/audio/music/Night Ambient 1.wav',
        auth_background_1: './static/backgrounds/Space_background.png',
        auth_background_2: './static/backgrounds/Space_Background2.png',
        game_bakcground: './static/backgrounds/Space Background6.png',
        menu_background: './static/backgrounds/Space Background4.png',
        auth_main_click: './static/audio/sounds/Air_FX_Pitched_Down.wav',
        auth_main_hover: './static/audio/sounds/FUI Holographic Interaction Radiate.wav',
        auth_second_click: './static/audio/sounds/FUI Holographic Button Press-1.wav',
        star: './static/images/star.png',
        recharge: './static/audio/sounds/High-Tech Gadget Activate.wav',
      },
    },
  ],
};
