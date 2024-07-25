import { sound } from '@pixi/sound';

export default class Settings {
  private static instance: Settings;
  private constructor() {}

  public static getInstance() {
    if (!Settings.instance) {
      Settings.instance = new Settings();
    }

    return Settings.instance;
  }

  setVolume(value: number) {
    sound.volumeAll = value;
  }
}
