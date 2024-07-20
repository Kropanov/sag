import { GameManager } from '../Manager/GameManager';
import { LoaderScene } from '../Scenes/LoaderScene/LoaderScene';

export default class GameLauncher {
  private static instance: GameLauncher;

  private constructor() {}

  public static Run(): GameLauncher {
    const manager = GameManager.getInstance();

    if (!GameLauncher.instance) {
      manager.initialize('#1099bb');
      manager.changeScene(new LoaderScene());
      GameLauncher.instance = new GameLauncher();
    }

    return GameLauncher.instance;
  }
}
