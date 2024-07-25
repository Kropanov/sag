import Character from '../Character/Character';
import Keyboard from '../Keyboard/Keyboard';

export default class Player extends Character {
  controls: Keyboard = Keyboard.getInstance();

  prevY: number;
  prevX: number;

  velocity: number = 4;

  constructor(texture: string, x: number, y: number) {
    super(texture, x, y);
    this.prevX = x;
    this.prevY = y;
  }

  update(delta: number, enemies: any, floorBounds: any) {
    this.prevX = this.sprite.x;
    this.prevY = this.sprite.y;

    super.update(delta, enemies, floorBounds);
    this.handleInput();

    enemies.forEach((enemy: any) => {
      if (this.checkCollision(enemy)) {
        this.sprite.x = this.prevX;
        this.sprite.y = this.prevY;
      }
    });

    this.checkFloorBounds(floorBounds);
  }

  handleInput() {
    if (this.controls.state.get('KeyW')) {
      this.move(0, -this.velocity);
    }
    if (this.controls.state.get('KeyS')) {
      this.move(0, this.velocity);
    }
    if (this.controls.state.get('KeyA')) {
      this.move(-this.velocity, 0);
    }
    if (this.controls.state.get('KeyD')) {
      this.move(this.velocity, 0);
    }
    if (this.controls.state.get('Space')) {
      this.move(0, -this.velocity);
    }
  }

  checkFloorBounds(bounds: any) {
    if (this.sprite.x < bounds.left) {
      this.sprite.x = bounds.left;
    }
    if (this.sprite.x + this.sprite.width > bounds.right) {
      this.sprite.x = bounds.right - this.sprite.width;
    }
    if (this.sprite.y < bounds.top) {
      this.sprite.y = bounds.top;
    }
    if (this.sprite.y + this.sprite.height > bounds.bottom) {
      this.sprite.y = bounds.bottom - this.sprite.height;
    }
  }
}
