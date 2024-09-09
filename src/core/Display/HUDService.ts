import { IScene } from '@/interfaces';
import { Graphics, Container, Text } from 'pixi.js';
import { UIBackpack } from './Components/UIBackpack';
import { Item, Player } from '../Entities';
import { UICurrentItem } from './Components/UICurrentItem';

export class HUDService {
  private static _instance: HUDService;

  private uiBackpack!: UIBackpack;
  private uiCurrentItem!: UICurrentItem;

  private player!: Player;
  private HPText!: Text;
  private scene!: IScene;
  private username!: Text;
  private HPBar!: Graphics;
  private planet!: Graphics;
  private hpBarsContainer!: Container;

  constructor() {
    if (HUDService._instance) {
      return HUDService._instance;
    }

    HUDService._instance = this;
  }

  initHUD(scene: IScene, player: Player) {
    this.scene = scene;
    this.player = player;
    this.#drawUI();
  }

  #drawUI() {
    this.#drawUIHPBar();
    this.#drawUIHPText();
    this.#drawUIPlanet();
    this.#drawUIUsername();
    this.#drawUIBackpack();
    this.#drawUIOtherHPBar();
    this.#drawUICurrentItem();
  }

  #addComponents(components: any) {
    for (let item of components) {
      this.scene.addChild(item);
    }
  }

  #drawUIHPBar() {
    this.HPBar = new Graphics().roundRect(40, 90, 350, 28, 10).fill('#FF8481').stroke({
      color: '#7C838A',
      width: 5,
    });

    this.HPBar.zIndex = 2;
    this.scene.addChild(this.HPBar);
  }

  #drawUIPlanet() {
    this.planet = new Graphics().circle(85, 48, 30).fill('#3BBEFF');
    this.planet.zIndex = 1;

    const p1 = new Graphics().circle(96, 60, 4).fill('#FFF');
    this.planet.addChild(p1);

    const p2 = new Graphics().circle(80, 58, 4).fill('#FFF');
    this.planet.addChild(p2);

    const p3 = new Graphics().circle(67, 50, 4).fill('#FFF');
    this.planet.addChild(p3);

    const b1 = new Graphics().circle(88, 38, 10).fill('#FFF');
    this.planet.addChild(b1);

    this.scene.addChild(this.planet);
  }

  #drawUICurrentItem() {
    this.uiCurrentItem = new UICurrentItem();
    this.#addComponents(this.uiCurrentItem.draw());
  }

  #drawUIHPText() {
    this.HPText = new Text({
      text: '100',
      style: {
        fontFamily: 'Consolas',
        fontSize: 24,
        fill: '#3a994c',
        fontWeight: 'bold',
      },
    });

    this.HPText.x = 340;
    this.HPText.y = 60;

    this.HPText.zIndex = 2;
    this.scene.addChild(this.HPText);
  }

  #drawUIUsername() {
    this.username = new Text({
      text: 'Sagf1889',
      style: {
        fontFamily: 'Consolas',
        fontSize: 24,
        fill: '#FFF',
        fontWeight: 'bold',
      },
    });

    this.username.x = 130;
    this.username.y = 48;

    this.username.zIndex = 1;
    this.scene.addChild(this.username);
  }

  #drawUIOtherHPBar() {
    const names = ['Brave_', '(❁´◡`❁)', 'pkwr300'];

    this.hpBarsContainer = new Container();
    this.scene.addChild(this.hpBarsContainer);

    for (let i = 0; i < 3; i++) {
      const hpBar = new Graphics()
        .roundRect(40, 290 + 75 * i, 270, 20, 10)
        .fill('#FF8481')
        .stroke({
          color: '#7C838A',
          width: 5,
        });

      const name = new Text({
        text: names[i],
        style: {
          fontFamily: 'Consolas',
          fontSize: 20,
          fill: '#FFF',
        },
      });

      name.x = 50;
      name.y = 264 + 75 * i;

      const hp = new Text({
        text: '100',
        style: {
          fontFamily: 'Consolas',
          fontSize: 20,
          fill: '#3a994c',
          fontWeight: 'bold',
        },
      });

      hp.x = 270;
      hp.y = 264 + 75 * i;

      name.zIndex = 1;
      hpBar.zIndex = 1;
      hp.zIndex = 1;

      this.hpBarsContainer.zIndex = 1;
      this.hpBarsContainer.visible = false;

      this.hpBarsContainer.addChild(hpBar);
      this.hpBarsContainer.addChild(hp);
      this.hpBarsContainer.addChild(name);
    }
  }

  #drawUIBackpack() {
    this.uiBackpack = new UIBackpack(this.player);
    this.#addComponents(this.uiBackpack.renderBackpackSlots());
  }

  getHUDContainers(): Container[] {
    return [this.uiBackpack.getContainer(), this.uiCurrentItem.getContainer()];
  }

  setUIAmmo(currentValue: number | string, maxAmmo: number) {
    this.uiCurrentItem.setAmmo(currentValue, maxAmmo);
  }

  setUIUsername(value: string) {
    this.username.text = value;
  }

  setUIBackpack(backpack: Array<Item> | undefined) {
    this.uiBackpack.updateBackpack(backpack);
  }

  resize(screenWidth: number, screenHeight: number) {
    this.uiBackpack.resize(screenWidth, screenHeight);
  }
}
