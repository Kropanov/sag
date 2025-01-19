export class KeyboardManager {
  private static _instance: KeyboardManager;

  public activeKeys: Set<string> = new Set();
  public readonly state: Map<string, boolean> = new Map();

  private justPressedState: Map<string, boolean> = new Map();

  public keyDownCallbacks: Array<(keyCode: string) => void> = [];
  public keyUpCallbacks: Array<(keyCode: string) => void> = [];

  constructor() {
    if (KeyboardManager._instance) {
      return KeyboardManager._instance;
    }

    this.initialize();
    KeyboardManager._instance = this;
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
    if (!this.state.get(e.code)) {
      this.justPressedState.set(e.code, true);
    }
    this.state.set(e.code, true);
    this.keyDownCallbacks.forEach((callback) => callback(e.code));
    this.activeKeys.add(e.code);
  }

  private keyUp(e: KeyboardEvent): void {
    this.state.set(e.code, false);
    this.justPressedState.set(e.code, false);
    this.keyUpCallbacks.forEach((callback) => callback(e.code));
    this.activeKeys.delete(e.code);
  }

  public isKeyJustPressed(keyCode: string): boolean {
    const isJustPressed = this.justPressedState.get(keyCode) || false;
    if (isJustPressed) {
      this.justPressedState.set(keyCode, false);
    }

    return isJustPressed;
  }

  public onKeyDown(callback: (keyCode: string) => void): void {
    this.keyDownCallbacks.push(callback);
  }

  public onKeyUp(callback: (keyCode: string) => void): void {
    this.keyUpCallbacks.push(callback);
  }
}
