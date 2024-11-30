import { GameManager } from '../Managers';
import { InitialScene } from '@core/Scenes';
import { theme } from '@/config';
import { NotificationManager } from '@core/Notification';

export class GameLauncher {
  private static instance: GameLauncher;

  private constructor() {}

  public static Run(): GameLauncher {
    const gameManager = GameManager.getInstance();

    if (!GameLauncher.instance) {
      const initScene = new InitialScene();
      const notificationManager = new NotificationManager();

      gameManager.initialize(theme.neutral.black).then((r) => r);

      gameManager.changeScene(initScene);
      notificationManager.setScene(initScene);

      GameLauncher.instance = new GameLauncher();
    }

    return GameLauncher.instance;
  }
}
