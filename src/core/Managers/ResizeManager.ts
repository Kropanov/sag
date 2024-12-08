import { EventEmitter } from '@core/Entities';

export class ResizeManager {
  private static _instance: ResizeManager;

  private width!: number;
  private height!: number;
  private eventEmitter!: EventEmitter;

  constructor() {
    if (ResizeManager._instance) {
      return ResizeManager._instance;
    }

    this.eventEmitter = new EventEmitter();
    this.updateDimensions();

    window.addEventListener('resize', this.onResize.bind(this));

    ResizeManager._instance = this;
  }

  private updateDimensions(): void {
    this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  }

  private onResize(): void {
    this.updateDimensions();
    this.eventEmitter.emit('resize', { width: this.width, height: this.height });
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public subscribe(callback: (dimensions: { width: number; height: number }) => void): void {
    this.eventEmitter.on('resize', callback);
  }

  public unsubscribe(callback: (dimensions: { width: number; height: number }) => void): void {
    this.eventEmitter.off('resize', callback);
  }
}
