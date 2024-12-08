import { EventEmitter } from '@core/Entities';
import { Container } from 'pixi.js';

export class HUDComponent extends Container {
  private eventEmitter?: EventEmitter;

  constructor() {
    super();
    this.visible = true; // Default visibility
  }

  public setEventBus(eventEmitter: EventEmitter): void {
    this.eventEmitter = eventEmitter;
  }

  public registerEvent<T = any>(event: string, callback: (data: T) => void): void {
    if (!this.eventEmitter) {
      console.warn('EventEmitter is not set.');
      return;
    }
    this.eventEmitter.on(event, callback);
  }

  public callEvent<T = any>(event: string, data: T): void {
    if (!this.eventEmitter) {
      console.warn('EventEmitter is not set.');
      return;
    }
    this.eventEmitter.emit(event, data);
  }

  public show() {
    this.visible = true;
  }

  public hide() {
    this.visible = false;
  }

  public update(_delta: number): void {
    // Override in subclasses for specific update logic
  }

  public resize(_screenWidth: number, _screenHeight: number): void {}
}
