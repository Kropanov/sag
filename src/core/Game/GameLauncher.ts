import { sound } from '@pixi/sound';
import { GameManager } from '../Manager/GameManager';
import { LoaderScene } from '../Scenes/LoaderScene/LoaderScene';

export default class GameLauncher {
  private static instance: GameLauncher;

  private constructor() {}

  public static Run(): GameLauncher {
    const manager = GameManager.getInstance();

    if (!GameLauncher.instance) {
      sound.volumeAll = 0.07;
      manager.initialize('#222425');
      manager.changeScene(new LoaderScene());
      GameLauncher.instance = new GameLauncher();
    }

    return GameLauncher.instance;
  }
}
