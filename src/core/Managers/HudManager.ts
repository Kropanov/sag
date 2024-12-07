import { Container } from 'pixi.js';
import { EventEmitter } from '@core/Entities';
import { HUDComponent } from '@core/Display';

export class HUDManager extends Container {
  private components: Map<string, HUDComponent>;
  private eventEmitter: EventEmitter;

  constructor() {
    super();
    this.components = new Map();
    this.eventEmitter = new EventEmitter();
  }

  public addComponent(name: string, component: HUDComponent) {
    if (this.components.has(name)) {
      console.warn(`Component with name "${name}" already exists.`);
      return;
    }

    this.components.set(name, component);
    this.addChild(component);
  }

  public removeComponent(name: string) {
    const component = this.components.get(name);
    if (!component) {
      console.warn(`Component with name "${name}" does not exist.`);
      return;
    }

    this.removeChild(component);
    this.components.delete(name);
  }

  public getComponent(name: string) {
    return this.components.get(name);
  }

  public update(delta: number) {
    this.components.forEach((component) => {
      if (typeof component.update === 'function') {
        component.update(delta);
      }
    });
  }

  public dispatch<T = any>(event: string, data: T): void {
    this.eventEmitter.emit(event, data);
  }
}
