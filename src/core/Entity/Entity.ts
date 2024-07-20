import { Sprite } from 'pixi.js';
import { IEntity } from '../../interfaces';

export default class Entity extends Sprite implements IEntity {
  public vx: number;
  public vy: number;
  public isColliding: boolean;

  constructor(texture: Sprite, x: number, y: number, vx: number, vy: number) {
    super(texture);
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.isColliding = false;
    this.anchor.set(0.5);
  }

  moveLeft(deltaTime: number): void {
    this.x -= this.vx * deltaTime;
  }

  moveRight(deltaTime: number): void {
    this.x += this.vx * deltaTime;
  }

  moveUp(deltaTime: number): void {
    this.y -= this.vy * deltaTime;
  }

  moveDown(deltaTime: number): void {
    this.y += this.vy * deltaTime;
  }

  update(deltaTime: number): void {
    this.detectCollisions();
  }

  detectCollisions(): void {
    // This method can be used to detect collisions with other entities
    // Implementation depends on your collision detection logic
  }

  col(obj1: Entity, obj2: Entity): void {
    const vCollision = { x: obj2.x - obj1.x, y: obj2.y - obj1.y };
    const distance = Math.sqrt(vCollision.x * vCollision.x + vCollision.y * vCollision.y);
    if (distance === 0) return; // Avoid division by zero
    const vCollisionNorm = { x: vCollision.x / distance, y: vCollision.y / distance };
    const vRelativeVelocity = { x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy };
    const speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;

    obj1.handleCollision(vCollisionNorm, speed);
    obj2.handleCollision(vCollisionNorm, -speed);
  }

  handleCollision(vCollisionNorm: { x: number; y: number }, speed: number): void {
    this.vx -= speed * vCollisionNorm.x;
    this.vy -= speed * vCollisionNorm.y;
  }
}
