import { GameManager } from '@core/Manager';
import { InitialScene } from '@core/Scenes';
import { theme } from '@/config';

export class GameLauncher {
  private static instance: GameLauncher;

  private constructor() {}

  public static Run(): GameLauncher {
    const manager = GameManager.getInstance();

    if (!GameLauncher.instance) {
      manager.initialize(theme.neutral.black);
      manager.changeScene(new InitialScene());
      GameLauncher.instance = new GameLauncher();
    }

    return GameLauncher.instance;
  }
}
