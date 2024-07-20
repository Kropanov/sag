import { IEntity } from '../../interfaces';

export default class Entity implements IEntity {
  public context: any;
  public x: number;
  public y: number;
  public vx: number;
  public vy: number;
  public isColliding: boolean;

  constructor(context: any, x: number, y: number, vx: number, vy: number) {
    this.context = context;

    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;

    this.isColliding = false;
  }

  moveLeft(fps: number): void {
    this.x += this.vx * fps;
  }

  moveRight(fps: number): void {
    this.y += this.vy * fps;
  }

  moveUp(fps: number): void {
    this.y -= this.vy * fps * (1 / 60);
  }

  moveDown(fps: number): void {
    this.y += this.vy * fps * (1 / 60);
  }

  handleCollision(vCollisionNorm: { x: number; y: number }, speed: number): void {
    this.vx -= speed * vCollisionNorm.x;
    this.vy -= speed * vCollisionNorm.y;
  }
}
