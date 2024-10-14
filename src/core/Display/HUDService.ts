import { HoverInfo, IScene } from '@/interfaces';
import { Graphics, Container, Text, Point } from 'pixi.js';
import { UIBackpack } from './Components/UIBackpack';
import { Item, Player } from '../Entities';
import { UICurrentItemDisplay } from './Components/UICurrentItemDisplay';
import { FancyButton } from '@pixi/ui';
import { FANCY_BUTTON_BASE_ANIMATION } from '@/config';
import { GameManager } from '../Manager';
import { sound } from '@pixi/sound';
import { UISettings } from './Components/UISettings';
import { UIBackpackHoverInfoBox } from '@core/Display/Components/UIBackpackHoverInfoBox.ts';

class HUDService {
  private scene: IScene;
  private player: Player;

  private manager = GameManager.getInstance();

  private uiBackpack: UIBackpack;
  private uiHoverBox: UIBackpackHoverInfoBox;
  private uiCurrentItemDisplay: UICurrentItemDisplay;
  private uiSettings: UISettings;

  private username!: Text;
  private HPBar!: Graphics;
  private HPText!: Text;
  private planet!: Graphics;
  private hpBarsContainer!: Container;

  private currentItem: Item | null = null;
  private currentItemIndex: number | null = null;

  private settingsButton!: FancyButton;

  constructor(scene: IScene, player: Player) {
    this.scene = scene;
    this.player = player;

    this.uiBackpack = new UIBackpack(this.player);
    this.addComponentsToScene(this.uiBackpack.render());

    this.uiHoverBox = new UIBackpackHoverInfoBox();
    this.addComponentsToScene(this.uiHoverBox.render());

    this.uiBackpack.on('showHoverInfoBox', (hoverInfo: HoverInfo) => {
      this.showItemHoverInfo(hoverInfo);
    });

    this.uiBackpack.on('hideHoverInfoBox', () => {
      this.uiHoverBox.hide();
    });

    this.uiBackpack.on('updateCurrentItem', (index: number) => {
      this.setCurrentItem(index);
    });

    this.uiBackpack.on('updateUIBackpack', () => {
      this.setUIBackpack(this.player.getBackpackItems());
    });

    this.uiCurrentItemDisplay = new UICurrentItemDisplay();
    this.addComponentsToScene(this.uiCurrentItemDisplay.render());

    this.uiSettings = new UISettings();
    this.addComponentsToScene(this.uiSettings.render());

    this.render();
  }

  private render() {
    this.renderPlayerHPBar();
    this.renderPlayerHPText();
    this.renderPlayerPlanet();
    this.renderPlayerUsername();
    this.renderSettingsButton();
    this.renderOtherPlayersHPBars();
  }

  private addComponentsToScene(components: any) {
    for (let element of components) {
      this.scene.addChild(element);
    }
  }

  private renderPlayerHPBar() {
    this.HPBar = new Graphics().roundRect(40, 90, 350, 28, 10).fill('#FF8481').stroke({
      color: '#7C838A',
      width: 5,
    });

    this.HPBar.zIndex = 2;
    this.scene.addChild(this.HPBar);
  }

  private renderPlayerPlanet() {
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

  private renderPlayerHPText() {
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

  private renderPlayerUsername() {
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

  private renderOtherPlayersHPBars() {
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

  public showFullInventoryWithSettings() {
    if (this.uiSettings.isWindowOpen()) {
      this.uiSettings.close();
      return;
    }

    this.settingsButton.visible = !this.settingsButton.visible;
    this.uiBackpack.toggleInventoryExpanded();
  }

  public renderSettingsButton() {
    const buttonText = new Text({
      text: 'Settings',
      style: {
        fontSize: 30,
        fontFamily: 'Consolas',
        fill: '#FFFFFF',
        textBaseline: 'bottom',
      },
    });

    this.settingsButton = new FancyButton({
      text: buttonText,
      animations: FANCY_BUTTON_BASE_ANIMATION,
    });

    this.settingsButton.zIndex = 5;
    this.settingsButton.eventMode = 'dynamic';
    this.settingsButton.onHover.connect(() => sound.play('main_hover_sound'));

    this.settingsButton.on('click', () => {
      sound.play('main_click_sound');
      this.uiSettings.open();
    });

    this.resizeSettingsButton(this.manager.getWidth(), this.manager.getHeight());

    this.settingsButton.visible = false;

    this.scene.addChild(this.settingsButton);
  }

  private resizeSettingsButton(screenWidth: number, screenHeight: number) {
    this.settingsButton.x = screenWidth - 100;
    this.settingsButton.y = screenHeight - 40;
  }

  public getHUDContainers(): Container[] {
    return [
      this.uiBackpack.getContainer(),
      this.uiCurrentItemDisplay.getContainer(),
      this.uiSettings.getContainer(),
      this.settingsButton,
    ];
  }

  public showItemHoverInfo(hoverInfo: HoverInfo) {
    const { targetItem, cursorX, cursorY } = hoverInfo;
    const globalPoint = new Point(cursorX, cursorY);
    const localPoint = this.scene.toLocal(globalPoint);
    this.uiHoverBox.setPosition(localPoint.x, localPoint.y);
    this.uiHoverBox.setItem(targetItem);
    this.uiHoverBox.show();
  }

  public setUIAmmo(currentValue: number | string, maxAmmo: number) {
    this.uiCurrentItemDisplay.setAmmo(currentValue, maxAmmo);
  }

  public setUIUsername(value: string) {
    this.username.text = value;
  }

  public setUIBackpack(backpack: Array<Item | null> | undefined) {
    this.uiBackpack.updateBackpack(backpack);

    if (this.currentItemIndex === null && backpack && backpack.length) {
      this.setCurrentItem(0);
    }
  }

  public setCurrentItem(index: number) {
    this.currentItemIndex = index;
    this.uiBackpack.setCurrentItem(index);
    this.currentItem = this.uiBackpack.getCurrentItem();
    this.uiCurrentItemDisplay.setCurrentItem(this.currentItem);
  }

  public resize(screenWidth: number, screenHeight: number) {
    this.uiBackpack.resize(screenWidth, screenHeight);
    this.resizeSettingsButton(screenWidth, screenHeight);
    this.uiSettings.resize(screenWidth, screenHeight);
  }
}

export { HUDService };
