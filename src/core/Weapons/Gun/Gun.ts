import { Keyboard } from '@/core/Keyboard';
import { GameManager } from '@/core/Manager';
import { HUDController, Player } from '@/core/Player';
import { lerp } from '@/utils';
import { Cartridge } from '../Cartridge/Cartridge';

class Gun {
  private player: Player;
  private cartridge: Cartridge;

  private hud = new HUDController();

  private keyboard = Keyboard.getInstance();
  private manager = GameManager.getInstance();

  private world: any = [];

  private mouseEvent!: MouseEvent;
  shootingInterval: any;

  constructor(player: Player, cartridge: Cartridge) {
    this.cartridge = cartridge;
    this.player = player;
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
    const currentAmmo = this.cartridge.getCurrentAmmo();
    this.hud.setUIAmmo(currentAmmo);
    if (currentAmmo === 0) {
      return;
    }

    const x0 = this.player.prevX;
    const y0 = this.player.prevY;

    const x1 = event.clientX;
    const y1 = event.clientY;

    const direction = lerp(x0, y0, x1, y1);

    this.cartridge.ammo[0].sprite.x = x0;
    this.cartridge.ammo[0].sprite.y = y0;
    this.cartridge.ammo[0].direction = direction;

    const ammo = this.cartridge.shoot();
    if (!ammo) {
      return;
    }

    const scene = this.manager.getCurrentScene();
    scene.addChild(ammo.sprite);
    this.world.push(ammo);
  }

  setCartridge(cartridge: Cartridge) {
    this.cartridge = cartridge;
  }

  handleStar(delta: number) {
    this.world.forEach((entity: any) => {
      if (entity.direction.x !== 0 || entity.direction.y !== 0) {
        entity.sprite.x += entity.direction.x * 2 * delta;
        entity.sprite.y += entity.direction.y * 2 * delta;
      }
    });
  }

  handleInput() {
    if (this.keyboard.state.get('KeyR')) {
      this.keyboard.state.set('KeyR', false);
      this.reload();
    }
  }

  reload() {
    this.cartridge.reload();
  }

  update(delta: number) {
    this.handleInput();
    this.handleStar(delta);
  }
}

export { Gun };