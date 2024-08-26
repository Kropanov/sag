import type { AssetsManifest } from 'pixi.js';

export const manifest: AssetsManifest = {
  bundles: [
    {
      name: 'images',
      assets: {
        bunny: './static/images/bunny.png',
        tile: './static/images/tile_0000.png',
      },
    },
    {
      name: 'ammo',
      assets: {
        ammo_default: './static/images/ammo/star.png',
        ammo_energy: './static/images/ammo/energyball_1.png',
        ammo_ice: './static/images/ammo/energyball_7.png',
        ammo_fire: './static/images/ammo/energyball_8.png',
        ammo_poison: './static/images/ammo/energyball_6.png',
        ammo_treatment: './static/images/ammo/energyball_3.png',
        ammo_wind: './static/images/ammo/energyball_2.png',
        ammo_lightning: './static/images/ammo/energyball_10.png',
        ammo_venom: './static/images/ammo/energyball_9.png',
        ammo_divine: './static/images/ammo/energyball_4.png',
        ammo_arcane: './static/images/ammo/energyball_5.png',
      },
    },
    {
      name: 'weapons',
      assets: {
        gun: './static/images/SCAR-L.png',
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
        game_background: './static/backgrounds/Space_background_7.png',
        menu_background: './static/backgrounds/Space_background_2.png',
      },
    },
  ],
};
