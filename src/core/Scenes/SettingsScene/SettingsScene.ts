import { Container, Graphics, Text } from 'pixi.js';
import { IScene } from '../../../interfaces';
import { GameManager } from '../../Manager/GameManager';
import Settings from '../../Settings/Settings';
import { Slider } from '@pixi/ui';
import Keyboard from '../../Keyboard/Keyboard';
import MenuScene from '../MenuScene/MenuScene';

const OFFSET = 1.4;

export default class SettingsScene extends Container implements IScene {
  private manager: GameManager = GameManager.getInstance();
  private settings: Settings = Settings.getInstance();
  private keyboard: Keyboard = Keyboard.getInstance();

  private title!: Text;
  private container!: Graphics;

  constructor() {
    super();

    this.drawContainer();
    this.drawTitle();
    this.drawVolumeSlider();

    this.resize(this.manager.getWidth(), this.manager.getHeight());
  }

  drawContainer() {
    this.container = new Graphics();
    this.container
      .filletRect(0, 0, this.manager.getWidth() / OFFSET, this.manager.getHeight() / OFFSET, 10)
      .fill('#36393B');

    this.addChild(this.container);
    this.resize(this.manager.getWidth(), this.manager.getHeight());
  }

  drawTitle() {
    this.title = new Text({
      text: 'Settings',
      style: {
        fontSize: 25,
        fill: '#00b1dd',
        align: 'center',
      },
    });

    this.title.x = this.container.width / 2 - 45;
    this.title.y += 12;

    this.container.addChild(this.title);
  }

  drawVolumeSlider() {
    this.drawSlider();
  }

  drawSlider() {
    const meshColor = '#222425';
    const backgroundColor = '#222425';
    const fontColor = '#FFFFFF';
    const min = 0;
    const max = 100;
    const width = 450;
    const height = 15;
    const radius = 25;
    const fontSize = 20;
    const showValue = true;

    const view = new Graphics();
    view.fill(backgroundColor).roundRect(0, 0, width, height, radius).fill();

    const fill = new Graphics();
    fill.fill(backgroundColor).roundRect(0, 0, width, height, radius).fill();

    const slider = new Graphics();
    slider.fill(meshColor).circle(0, 0, 20).fill();

    const singleSlider = new Slider({
      bg: view,
      fill: fill,
      slider: slider,
      min,
      max,
      value: this.settings.volume,
      valueTextStyle: {
        fill: fontColor,
        fontSize,
      },
      showValue,
    });

    singleSlider.x = (this.manager.getWidth() / OFFSET - width) / 2;
    singleSlider.y = this.manager.getHeight() / OFFSET / 2 - 140;
    singleSlider.onUpdate.connect((value) => this.settings.setVolume(value));

    this.container.addChild(singleSlider);
  }

  handleInput() {
    if (this.keyboard.state.get('Escape')) {
      this.manager.changeScene(new MenuScene());
    }
  }

  update(_framesPassed: number): void {
    this.handleInput();
  }

  resize(_screenWidth: number, _screenHeight: number): void {
    const containerWidth = _screenWidth / OFFSET;
    const containerHeight = _screenHeight / OFFSET;

    this.container.x = (_screenWidth - containerWidth) / 2;
    this.container.y = (_screenHeight - containerHeight) / 2;
    this.container.width = containerWidth;
    this.container.height = containerHeight;
  }
}
