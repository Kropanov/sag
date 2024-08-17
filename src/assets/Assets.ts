import type { AssetsManifest } from 'pixi.js';

export const manifest: AssetsManifest = {
  bundles: [
    {
      name: 'images',
      assets: {
        bunny: './static/images/bunny.png',
        tile: './static/images/tile_0000.png',
        ammo_default: './static/images/star.png',
      },
    },
    {
      name: 'icons',
      assets: {
        github_black: './static/icons/github.png',
        github_gray: './static/icons/github-mark.png',
        github_white: './static/icons/github-mark-white.png',
      },
    },
    {
      name: 'sounds',
      assets: {
        auth_click: './static/audio/sounds/FUI Holographic Button Press-1.wav',
        auth_hover: './static/audio/sounds/FUI Holographic Interaction Radiate.wav',
        recharge_cartridge: './static/audio/sounds/High-Tech Gadget Activate.wav',
      },
    },
    {
      name: 'music',
      assets: {
        auth_theme: './static/audio/music/Night Ambient 1.wav',
      },
    },
    {
      name: 'backgrounds',
      assets: {
        login_background: './static/backgrounds/Space_background_5.png',
        signup_background: './static/backgrounds/Space_background_6.png',
        game_background: './static/backgrounds/Space_background_3.png',
        menu_background: './static/backgrounds/Space_background_2.png',
      },
    },
  ],
};
