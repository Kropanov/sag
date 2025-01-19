import type { AssetsManifest } from 'pixi.js';

export const manifest: AssetsManifest = {
  bundles: [
    {
      name: 'images',
      assets: {
        bunny: './static/assets/images/bunny.png',
        tile: './static/assets/images/tile_0000.png',
      },
    },
    {
      name: 'ammo',
      assets: {
        ammo_default: './static/assets/images/ammo/star.png',
        ammo_energy: './static/assets/images/ammo/energyball_1.png',
        ammo_ice: './static/assets/images/ammo/energyball_7.png',
        ammo_fire: './static/assets/images/ammo/energyball_8.png',
        ammo_poison: './static/assets/images/ammo/energyball_6.png',
        ammo_treatment: './static/assets/images/ammo/energyball_3.png',
        ammo_wind: './static/assets/images/ammo/energyball_2.png',
        ammo_lightning: './static/assets/images/ammo/energyball_10.png',
        ammo_venom: './static/assets/images/ammo/energyball_9.png',
        ammo_divine: './static/assets/images/ammo/energyball_4.png',
        ammo_arcane: './static/assets/images/ammo/energyball_5.png',
      },
    },
    {
      name: 'weapons',
      assets: {
        pistol: './static/assets/images/weapons/pistol.png',
      },
    },
    {
      name: 'artifacts',
      assets: {
        coal: './static/assets/images/artifacts/coal.png',
        angel: './static/assets/images/artifacts/angel.png',
        bug: './static/assets/images/artifacts/bug.png',
        talisman: './static/assets/images/artifacts/talisman.png',
        map: './static/assets/images/artifacts/map.png',
        talisman_2: './static/assets/images/artifacts/talisman_2.png',
        book_1: './static/assets/images/artifacts/book_1.png',
        book_2: './static/assets/images/artifacts/book_2.png',
        book_3: './static/assets/images/artifacts/book_3.png',
        book_4: './static/assets/images/artifacts/book_4.png',
        book_5: './static/assets/images/artifacts/book_5.png',
        magazine_1: './static/assets/images/artifacts/magazine_1.png',
        magazine_2: './static/assets/images/artifacts/magazine_2.png',
        magazine_3: './static/assets/images/artifacts/magazine_3.png',
        magazine_4: './static/assets/images/artifacts/magazine_4.png',
        magazine_5: './static/assets/images/artifacts/magazine_5.png',
        magazine_6: './static/assets/images/artifacts/magazine_6.png',
        magazine_7: './static/assets/images/artifacts/magazine_7.png',
        magazine_8: './static/assets/images/artifacts/magazine_8.png',
        magazine_9: './static/assets/images/artifacts/magazine_9.png',
        magazine_10: './static/assets/images/artifacts/magazine_10.png',
        magazine_11: './static/assets/images/artifacts/magazine_11.png',
      },
    },
    {
      name: 'materials',
      assets: {
        gasoline: './static/assets/images/materials/gasoline.png',
        gasoline_can: './static/assets/images/materials/gasoline_can.png',
        empty_gasoline_can: './static/assets/images/materials/empty_gasoline_can.png',
        mineral: './static/assets/images/materials/mineral_2.png',
        book: './static/assets/images/materials/book.png',
        // not sorted
        bread: './static/assets/images/materials/bread.png',
        evil_eye_1: './static/assets/images/materials/evil_eye_1.png',
        evil_eye_2: './static/assets/images/materials/evil_eye_2.png',
        garbage: './static/assets/images/materials/garbage.png',
      },
    },
    {
      name: 'currency',
      assets: {
        coin: './static/assets/images/currency/coin.png',
      },
    },
    {
      name: 'ui',
      assets: {
        no_item_v1: './static/assets/images/ui/no_item_v1.png',
        empty: './static/assets/images/ui/empty.png',
      },
    },
    {
      name: 'icons',
      assets: {
        github_black: './static/assets/icons/github.png',
        github_gray: './static/assets/icons/github-mark.png',
        github_white: './static/assets/icons/github-mark-white.png',
      },
    },
    {
      name: 'sounds',
      assets: {
        main_click_sound: './static/assets/audio/sounds/FUI Holographic Button Press-1.wav',
        main_hover_sound: './static/assets/audio/sounds/FUI Holographic Interaction Radiate.wav',
        recharge_cartridge: './static/assets/audio/sounds/High-Tech Gadget Activate.wav',
      },
    },
    {
      name: 'music',
      assets: {
        auth_theme: './static/assets/audio/music/Night Ambient 1.wav',
      },
    },
    {
      name: 'backgrounds',
      assets: {
        login_background: './static/assets/images/backgrounds/Space_background_5.png',
        signup_background: './static/assets/images/backgrounds/Space_background_6.png',
        game_background: './static/assets/images/backgrounds/Space_background_7.png',
        menu_background: './static/assets/images/backgrounds/Space_background_2.png',
      },
    },
  ],
};
