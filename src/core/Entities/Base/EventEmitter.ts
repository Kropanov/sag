type EventCallback<T = any> = (data: T) => void;

export class EventEmitter {
  private events: Map<string, EventCallback[]>;

  constructor() {
    this.events = new Map();
  }

  on<T = any>(event: string, callback: EventCallback<T>): void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(callback);
  }

  off<T = any>(event: string, callback: EventCallback<T>): void {
    const listeners = this.events.get(event);
    if (!listeners) return;

    this.events.set(
      event,
      listeners.filter((listener) => listener !== callback),
    );
  }

  emit<T = any>(event: string, data: T): void {
    const listeners = this.events.get(event);
    if (!listeners) return;

    listeners.forEach((callback) => callback(data));
  }
}
