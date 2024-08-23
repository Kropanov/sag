import { IScene } from '@/interfaces';
import { GameManager } from '../Manager';
import { Graphics, Text } from 'pixi.js';

class HUDController {
  private static _instance: HUDController;

  private manager = GameManager.getInstance();

  private ammo!: Text;
  private scene!: IScene;
  private HPBar!: Graphics;
  private HPText!: Text;
  private planet!: Graphics;
  private username!: Text;

  constructor() {
    if (HUDController._instance) {
      return HUDController._instance;
    }

    HUDController._instance = this;
  }

  initHUD(scene: IScene) {
    this.scene = scene;
    this.#drawUI();
  }

  #drawUI() {
    this.#drawUIAmmo();
    this.#drawUIHPBar();
    this.#drawUIHPText();
    this.#drawUIPlanet();
    this.#drawUIUsername();
    this.#drawUIOtherHPBar();
  }

  #drawUIAmmo() {
    this.ammo = new Text({
      text: 'Some text',
      style: {
        fontFamily: 'Consolas',
        fontSize: 35,
        fill: '#ADADAD',
      },
    });

    this.ammo.x = this.manager.getWidth() - 50;
    this.ammo.y = this.manager.getHeight() - this.ammo.height - 6;

    this.ammo.zIndex = 1;

    this.scene.addChild(this.ammo);
  }

  #drawUIHPBar() {
    this.HPBar = new Graphics().roundRect(40, 90, 350, 28, 10).fill('#FF8481').stroke({
      color: '#7C838A',
      width: 5,
    });

    this.HPBar.zIndex = 1;
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

    this.HPText.zIndex = 1;
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

      this.scene.addChild(hpBar);
      this.scene.addChild(hp);
      this.scene.addChild(name);
    }
  }

  setUIAmmo(value: number | string) {
    this.ammo.text = value;
  }

  setUIUsername(value: string) {
    this.username.text = value;
  }

  resize(screenWidth: number, screenHeight: number) {
    this.ammo.x = screenWidth - 50;
    this.ammo.y = screenHeight - this.ammo.height - 6;
  }
}

export { HUDController };
