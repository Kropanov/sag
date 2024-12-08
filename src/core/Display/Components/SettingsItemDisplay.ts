import { ContainerChild, Container, Graphics, Text } from 'pixi.js';
import { GameManager } from '@core/Managers';
import { UIComponent } from '@interfaces';
import { Slider } from '@pixi/ui';
import { theme } from '@config';
import { HUDComponent } from '@core/Display';

class SettingsItemDisplay extends HUDComponent {
  private game: GameManager = new GameManager();
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
    const meshColor = theme.background.secondary;
    const backgroundColor = theme.background.secondary;
    const fontColor = theme.neutral.white;
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
        fill: theme.neutral.white,
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
      value: this.game.audio.volume,
      valueTextStyle: {
        fill: fontColor,
        fontSize,
      },
      showValue,
    });

    singleSlider.onUpdate.connect((value) => {
      this.game.audio.setVolume(value);
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

export { SettingsItemDisplay };
