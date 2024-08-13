import { lerp } from '@/utils';
import { Sprite } from 'pixi.js';

// TODO: optimize and do refactoring
export class Gun {
  private queue: any = [];
  private world: any = [];

  private player: any;
  private scene: any;

  private dir: any = {
    x: 0,
    y: 0,
  };

  constructor(scene: any, player: any) {
    this.scene = scene;
    this.player = player;

    this.recharge();
    this.listen();
  }

  listen() {
    window.addEventListener('mousedown', this.click.bind(this));
  }

  recharge() {
    for (let i = 0; i <= 30; i++) {
      const star = Sprite.from('star');
      star.scale.x = 0.05;
      star.scale.y = 0.05;

      this.queue.push({
        bullet: star,
        direction: {
          x: 0,
          y: 0,
        },
      });
    }
  }

  click({ clientX, clientY }: MouseEvent) {
    const x0 = this.player.prevX;
    const y0 = this.player.prevY;

    const x1 = clientX;
    const y1 = clientY;

    this.dir = lerp(x0, y0, x1, y1);

    this.queue[0].bullet.x = x0;
    this.queue[0].bullet.y = y0;
    this.queue[0].direction = this.dir;

    const element = this.queue.shift();
    this.scene.addChild(element.bullet);
    this.world.push(element);
  }

  handleStar(delta: number) {
    this.world.forEach((element: any) => {
      if (element.direction.x !== 0 || element.direction.y !== 0) {
        element.bullet.x += element.direction.x * 2 * delta;
        element.bullet.y += element.direction.y * 2 * delta;
      }
    });
  }

  update(delta: number) {
    this.handleStar(delta);
  }
}
