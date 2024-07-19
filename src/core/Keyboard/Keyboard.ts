export default class Keyboard {
  private static _instance: Keyboard;
  public readonly state: Map<string, boolean> = new Map();

  private constructor() {}

  public static getInstance(): Keyboard {
    if (!Keyboard._instance) {
      Keyboard._instance = new Keyboard();
      this._instance.initialize();
    }

    return Keyboard._instance;
  }

  public initialize() {
    document.addEventListener('keydown', this.keyDown.bind(this));
    document.addEventListener('keyup', this.keyUp.bind(this));
  }

  public remove() {
    document.removeEventListener('keydown', this.keyDown.bind(this));
    document.removeEventListener('keyup', this.keyUp.bind(this));
  }

  private keyDown(e: KeyboardEvent): void {
    this.state.set(e.code, true);
  }

  private keyUp(e: KeyboardEvent): void {
    this.state.set(e.code, false);
  }
}
