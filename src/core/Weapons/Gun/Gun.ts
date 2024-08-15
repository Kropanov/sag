import { Keyboard } from '@/core/Keyboard';
import { GameManager } from '@/core/Manager';
import { HUDController } from '@/core/Player';
import { lerp } from '@/utils';
import { sound } from '@pixi/sound';
import { Sprite } from 'pixi.js';

// TODO: split on files
export class Gun {
  private keyboard = Keyboard.getInstance();
  private manager = GameManager.getInstance();
  private hud = new HUDController();

  private queue: any = [];
  private world: any = [];

  private mouseEvent!: MouseEvent;

  private player: any;

  private dir: any = {
    x: 0,
    y: 0,
  };

  shootingInterval: any;

  constructor(player: any) {
    this.player = player;
    this.recharge();
    this.listen();
  }

  listen() {
    window.addEventListener('mousedown', this.startShooting.bind(this));
    window.addEventListener('mouseup', this.stopShooting.bind(this));
    window.addEventListener('mousemove', this.handleMouseMoving.bind(this));
  }

  startShooting(event: MouseEvent) {
    if (event.button === 0) {
      this.shoot(event);
      this.shootingInterval = setInterval(() => {
        this.shoot(this.mouseEvent);
      }, 100);
    }
  }

  stopShooting(event: MouseEvent) {
    if (event.button === 0) {
      if (this.shootingInterval !== null) {
        clearInterval(this.shootingInterval);
        this.shootingInterval = null;
      }
    }
  }

  handleMouseMoving(event: MouseEvent) {
    this.mouseEvent = event;
  }

  shoot(event: MouseEvent) {
    if (this.queue.length === 0) return;

    const x0 = this.player.prevX;
    const y0 = this.player.prevY;

    const x1 = event.clientX;
    const y1 = event.clientY;

    this.dir = lerp(x0, y0, x1, y1);

    this.queue[0].bullet.x = x0;
    this.queue[0].bullet.y = y0;
    this.queue[0].direction = this.dir;

    const element = this.queue.shift();
    this.hud.setUIAmmo(this.queue.length);
    const scene = this.manager.getCurrentScene();
    scene.addChild(element.bullet);
    this.world.push(element);
  }

  recharge() {
    this.queue.length = 0;
    for (let i = 0; i < 30; i++) {
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

    this.hud.setUIAmmo(this.queue.length);
  }

  handleStar(delta: number) {
    this.world.forEach((element: any) => {
      if (element.direction.x !== 0 || element.direction.y !== 0) {
        element.bullet.x += element.direction.x * 2 * delta;
        element.bullet.y += element.direction.y * 2 * delta;
      }
    });
  }

  handleInput() {
    if (this.keyboard.state.get('KeyR')) {
      this.keyboard.state.set('KeyR', false);
      sound.play('recharge');
      this.recharge();
    }
  }

  update(delta: number) {
    this.handleInput();
    this.handleStar(delta);
  }
}
