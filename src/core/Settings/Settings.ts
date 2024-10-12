import { sound } from '@pixi/sound';
import { INITIAL_SOUND_VOLUME } from '@/config';

export class Settings {
  private static instance: Settings;

  private constructor() {}

  // FIXME: MusicController should contain all sound and music logic
  public static getInstance() {
    if (!Settings.instance) {
      sound.volumeAll = INITIAL_SOUND_VOLUME;
      Settings.instance = new Settings();
    }

    return Settings.instance;
  }

  public get volume(): number {
    return sound.volumeAll * 200;
  }

  setVolume(value: number): void {
    sound.volumeAll = value / 200;
  }
}
