import { App } from '@core/Launcher';

export class AppLauncher {
  private static instance: AppLauncher;

  private constructor() {}

  public static Run(): AppLauncher {
    if (!AppLauncher.instance) {
      new App();
      AppLauncher.instance = new AppLauncher();
    }

    return AppLauncher.instance;
  }
}
