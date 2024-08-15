import { sound } from '@pixi/sound';

export class MusicController {
  private static _instance: MusicController;
  private _cache: string = '';

  constructor() {
    if (MusicController._instance) {
      return MusicController._instance;
    }

    MusicController._instance = this;
  }

  play(value: string) {
    if (this.#same(value)) {
      return;
    }

    this._cache = value;
    sound.play(value);
  }

  stop() {
    sound.stop(this._cache);
  }

  #same(value: string) {
    return value === this._cache;
  }
}
