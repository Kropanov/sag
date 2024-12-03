import { InitialScene } from '@core/Scenes';
import { GameManager } from '@core/Managers';
import { theme } from '@config';

export class GameLauncher {
  private static instance: GameLauncher;

  private constructor() {}

  public static Run(): GameLauncher {
    const game: GameManager = new GameManager();

    if (!GameLauncher.instance) {
      const initScene = new InitialScene();

      game.scene.initialize(theme.neutral.black).then((r) => r);
      game.scene.changeScene(initScene);
      game.notify.setScene(initScene);

      GameLauncher.instance = new GameLauncher();
    }

    return GameLauncher.instance;
  }
}
