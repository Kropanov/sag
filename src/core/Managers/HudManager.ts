import { AmmoCounter, HUDComponent } from '@core/Display';
import { Container } from 'pixi.js';
import { EventEmitter } from '@core/Entities';
import { ResizeManager } from '@core/Managers/ResizeManager.ts';
import { SceneManager } from '@core/Managers/SceneManager.ts';

// Define a type-safe registry for components
interface HUDComponentRegistry {
  ammo: AmmoCounter;
  // Add other components here as needed
}

export class HUDManager extends Container {
  private static _instance: HUDManager;
  private readonly components!: Partial<Record<keyof HUDComponentRegistry, HUDComponent>>;
  private readonly eventEmitter!: EventEmitter;
  private readonly scene!: SceneManager;

  private resizeManager: ResizeManager = new ResizeManager();

  private constructor() {
    super();

    // Initialize properties
    this.components = {};
    this.scene = new SceneManager();
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

  public addComponent<K extends keyof HUDComponentRegistry>(name: K, component: HUDComponentRegistry[K]): void {
    if (this.components[name]) {
      console.warn(`Component with name "${name}" already exists.`);
      return;
    }
    component.setEventBus(this.eventEmitter);
    this.components[name] = component;
    this.scene.addToScene(component);
    this.addChild(component);
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
