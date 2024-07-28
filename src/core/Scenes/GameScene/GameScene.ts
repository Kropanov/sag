import { Container } from 'pixi.js';
import { IScene } from '../../../interfaces';
import { GameManager } from '../../Manager/GameManager';
import Player from '../../Player/Player';
import { CharacterWithStrategy, MeleeAttack } from '../../Strategy';
import Keyboard from '../../Keyboard/Keyboard';
import MenuScene from '../MenuScene/MenuScene';

export class GameScene extends Container implements IScene {
  private manager: GameManager = GameManager.getInstance();
  private player: Player;
  private enemies: any;

  private floorBounds = { left: 0, right: 0, top: 0, bottom: 0 };
  private keyboard: Keyboard = Keyboard.getInstance();

  constructor() {
    super();

    this.player = new Player('bunny', 100, 100);

    let enemy1 = new CharacterWithStrategy('tile', 200, 200, new MeleeAttack());
    let enemy2 = new CharacterWithStrategy('tile', 300, 300, new MeleeAttack());

    this.enemies = [enemy1, enemy2];

    this.addChild(enemy1.sprite);
    this.addChild(enemy2.sprite);
    this.addChild(this.player.sprite);

    this.updateFloorBounds();
  }

  // TODO: add handleInput to IScene
  handleInput() {
    if (this.keyboard.state.get('Escape')) {
      this.manager.changeScene(new MenuScene());
    }
  }

  resize(_screenWidth: number, _screenHeight: number): void {
    this.updateFloorBounds(_screenWidth, _screenHeight);
  }

  update(delta: number): void {
    this.handleInput();
    this.player.update(delta, this.enemies, this.floorBounds);
  }

  private updateFloorBounds(_screenWidth?: number, _screenHeight?: number): void {
    const screenWidth = _screenWidth || this.manager.getWidth();
    const screenHeight = _screenHeight || this.manager.getHeight();

    this.floorBounds = {
      left: 0,
      right: screenWidth,
      top: 0,
      bottom: screenHeight,
    };
  }
}
