export class KeyboardManager {
  private static _instance: KeyboardManager;
  public readonly state: Map<string, boolean> = new Map();
  private justPressedState: Map<string, boolean> = new Map();

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
  }

  private keyUp(e: KeyboardEvent): void {
    this.state.set(e.code, false);
    this.justPressedState.set(e.code, false);
  }

  public isKeyJustPressed(keyCode: string): boolean {
    const isJustPressed = this.justPressedState.get(keyCode) || false;
    if (isJustPressed) {
      this.justPressedState.set(keyCode, false);
    }

    return isJustPressed;
  }
}
