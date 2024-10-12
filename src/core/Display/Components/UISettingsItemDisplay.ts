import { UIComponent } from '@/interfaces';
import { ContainerChild, Container, Graphics, Text } from 'pixi.js';
import { Slider } from '@pixi/ui';
import { Settings } from '@core/Settings';

class UISettingsItemDisplay implements UIComponent {
  private settings: Settings = Settings.getInstance();
  private container!: Container;

  public render(): Array<ContainerChild> {
    this.renderContainer();
    this.renderMusicSlider();

    return [this.container];
  }

  private renderContainer() {
    this.container = new Container();
    this.container.y = 50;
    this.container.x = 370;
  }

  private renderMusicSlider() {
    const meshColor = '#222425';
    const backgroundColor = '#222425';
    const fontColor = '#FFFFFF';
    const min = 0;
    const max = 100;
    const width = 200;
    const height = 10;
    const radius = 25;
    const fontSize = 15;
    const showValue = true;

    const text = new Text({
      text: 'Music',
      style: {
        fontSize: 15,
        fill: '#FFFFFF',
        align: 'center',
      },
    });

    text.x = -50;
    text.y = -5;

    const view = new Graphics();
    view.fill(backgroundColor).roundRect(0, 0, width, height, radius).fill();

    const fill = new Graphics();
    fill.fill(backgroundColor).roundRect(0, 0, width, height, radius).fill();

    const slider = new Graphics();
    slider.fill(meshColor).circle(0, 0, 15).fill();

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

    singleSlider.onUpdate.connect((value) => {
      this.settings.setVolume(value);
    });

    this.container.addChild(text);
    this.container.addChild(singleSlider);
  }

  public getContainer(): Container {
    throw new Error('Method not implemented.');
  }

  public addComponent(_component: UIComponent): void {
    throw new Error('Method not implemented.');
  }

  public resize(_screenWidth: number, _screenHeight: number): void {
    throw new Error('Method not implemented.');
  }
}

export { UISettingsItemDisplay };
