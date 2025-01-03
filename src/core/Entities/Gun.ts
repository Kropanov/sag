import { Ammo, Cartridge, Item, Player } from '@core/Entities';
import { lerp } from '@utils';
import { GameManager, SceneManager } from '@core/Managers';
import { ItemProps } from '@interfaces';

class Gun extends Item {
  private player: Player;
  private cartridge: Cartridge;

  private game: GameManager = new GameManager();
  private scene: SceneManager = new SceneManager();

  private world: any = [];

  private mouseEvent!: MouseEvent;
  shootingInterval: any;

  constructor(props: ItemProps, player: Player, cartridge: Cartridge) {
    super(props);
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
    // const hudContainers = this.hudController.getHUDContainers();
    //
    // for (let container of hudContainers) {
    //   const hudBounds = container.getBounds();
    //   if (isClickInsideHUDElement(event, hudBounds)) {
    //     return;
    //   }
    // }

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
    if (!this.cartridge.getCurrentAmmo()) {
      return;
    }

    const x0 = this.player.prevX;
    const y0 = this.player.prevY;

    const x1 = event.clientX;
    const y1 = event.clientY;

    const direction = lerp(x0, y0, x1, y1);

    const ammo = this.cartridge.getBullets()[0];
    const ammoSprite = ammo.getSprite();

    ammo.setDirection(direction);
    ammo.setSpritePosition(x0, y0);

    // const currentAmmo = this.cartridge.shoot();
    // const maxAmmo = this.cartridge.getMaxAmmo();
    // this.hudController.setUIAmmo(currentAmmo, maxAmmo);

    const scene = this.scene.getCurrentScene();
    scene?.addChild(ammoSprite);
    this.world.push(ammo);
  }

  setCartridge(cartridge: Cartridge) {
    this.cartridge = cartridge;
  }

  handleStar(delta: number) {
    this.world.forEach((ammo: Ammo) => {
      const sprite = ammo.getSprite();
      const direction = ammo.getDirection();

      if (direction.x === 0 || direction.y === 0) {
        return;
      }

      sprite.x += direction.x * 2 * delta;
      sprite.y += direction.y * 2 * delta;
    });
  }

  handleInput() {
    if (this.game.keyboard.state.get('KeyR')) {
      this.game.keyboard.state.set('KeyR', false);
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
