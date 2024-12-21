import { Container } from 'pixi.js';
import { HUDComponent } from '@core/Display';
import { EventEmitter } from '@core/Entities';
import { ResizeManager } from '@core/Managers';
import { HUDComponentRegistry } from '@interfaces';
import { hudComponents } from '@config';

export class HUDManager extends Container {
  private static _instance: HUDManager;

  private readonly components: Partial<Record<keyof HUDComponentRegistry, HUDComponent>>;

  private readonly eventEmitter: EventEmitter;

  private resizeManager: ResizeManager = new ResizeManager();

  private constructor() {
    super();

    this.components = {};
    this.eventEmitter = new EventEmitter();
    this.resizeManager = new ResizeManager();

    this.handleResizeUpdates();
  }

  public static getInstance(): HUDManager {
    if (!HUDManager._instance) {
      HUDManager._instance = new HUDManager();
    }

    return HUDManager._instance;
  }

  public initializeHUD(): void {
    Object.entries(hudComponents).forEach(([key, component]) => {
      this.addComponent(key as keyof HUDComponentRegistry, component);
    });
  }

  public destroyHUD(): void {
    Object.entries(this.components).forEach(([key, _component]) => {
      this.removeComponent(key as keyof HUDComponentRegistry);
    });
  }

  public showHUD(): void {
    Object.entries(this.components).forEach(([_key, component]) => {
      if (component.alwaysVisible) {
        component.show();
      }
    });
  }

  public hideHUD(): void {
    Object.entries(this.components).forEach(([_key, component]) => {
      component.hide();
    });
  }

  public addComponent<K extends keyof HUDComponentRegistry>(name: K, component: HUDComponentRegistry[K]): void {
    if (this.components[name]) {
      console.warn(`Component with name "${name}" already exists.`);
      return;
    }

    component.setEventBus(this.eventEmitter);
    this.components[name] = component;
  }

  removeComponent<K extends keyof HUDComponentRegistry>(name: K): void {
    const component = this.components[name];
    if (!component) {
      console.warn(`Component with name "${name}" does not exist.`);
      return;
    }

    this.removeChild(component);
    delete this.components[name];
  }

  getComponent<K extends keyof HUDComponentRegistry>(name: K): HUDComponentRegistry[K] | undefined {
    return this.components[name] as HUDComponentRegistry[K];
  }

  getComponents() {
    return Object.values(this.components);
  }

  update(delta: number): void {
    Object.values(this.components).forEach((component) => {
      if (component?.update) {
        component.update(delta);
      }
    });
  }

  public dispatch<T = any>(event: string, data: T): void {
    this.eventEmitter.emit(event, data);
  }

  private handleResizeUpdates() {
    this.resizeManager.subscribe(({ width, height }) => {
      Object.values(this.components).forEach((component) => {
        if (component?.resize) {
          component.resize(width, height);
        }
      });
    });
  }
}
