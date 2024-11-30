import { sound, SoundLibrary } from '@pixi/sound';

/**
 * Manages audio functionalities for the game, such as sound playback and volume control.
 */
export class AudioManager {
  /**
   * Singleton instance of the AudioManager.
   * @private
   */
  private static _instance: AudioManager;

  /**
   * Reference to the PixiJS sound library.
   * @private
   */
  private _sound = sound;

  /**
   * Scaling factor for converting internal volume to external representation.
   * @private
   * @constant
   */
  private readonly VOLUME_SCALE = 200;

  /**
   * Cache to store the last played sound.
   * @private
   * @type {string}
   */
  private _cache: string = '';

  /**
   * Creates an instance of AudioManager. Ensures that only one instance is created (Singleton pattern).
   */
  constructor() {
    if (AudioManager._instance) {
      return AudioManager._instance;
    }

    AudioManager._instance = this;
  }

  /**
   * Returns the PixiJS sound library for managing sounds.
   * @returns {SoundLibrary} The sound library instance.
   */
  public get sound(): SoundLibrary {
    return this._sound;
  }

  /**
   * Gets the current volume of all sounds, scaled to a range based on `VOLUME_SCALE`.
   * @returns {number} The current volume, scaled to the range defined by `VOLUME_SCALE`.
   */
  public get volume(): number {
    return sound.volumeAll * this.VOLUME_SCALE;
  }

  /**
   * Sets the volume for all sounds. The input value is scaled internally based on `VOLUME_SCALE`.
   * @param {number} value - The new volume level, scaled to the range defined by `VOLUME_SCALE`.
   */
  public setVolume(value: number): void {
    sound.volumeAll = value / this.VOLUME_SCALE;
  }

  /**
   * Plays a sound if it is different from the last played one.
   * @param {string} value - The name of the sound file to play.
   */
  public play(value: string) {
    if (this.isSame(value)) return;

    this._cache = value;
    sound.play(value);
  }

  /**
   * Stops the currently playing sound if any.
   */
  public stop() {
    if (this.isNotCached()) return;

    sound.stop(this._cache);
  }

  /**
   * Checks if the sound is not cached.
   * @private
   * @returns {boolean} - Returns true if the sound is not cached, otherwise false.
   */
  private isNotCached(): boolean {
    return !this._cache;
  }

  /**
   * Checks if the provided sound is the same as the last played sound.
   * @private
   * @param {string} value - The name of the sound to compare.
   * @returns {boolean} - Returns true if the sound is the same as the cached one, otherwise false.
   */
  private isSame(value: string): boolean {
    return value === this._cache;
  }
}
