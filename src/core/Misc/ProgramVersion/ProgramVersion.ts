import { Text } from 'pixi.js';
import { theme } from '@config';
import { GameManager } from '@core/Managers';
import { version } from '../../../../package.json';

function getProgramVersion() {
  const game = new GameManager();

  const versionText = new Text({
    text: `v${version} beta`,
    style: {
      fontFamily: 'Consolas',
      fontSize: 20,
      fill: theme.text.primary,
    },
  });

  versionText.x = game.scene.getWidth() - versionText.width - 8;
  versionText.y = game.scene.getHeight() - versionText.height - 5;

  return versionText;
}

function handleProgramVersionResize(version: Text, screenWidth: number, screenHeight: number) {
  version.x = screenWidth - version.width - 8;
  version.y = screenHeight - version.height - 5;
}

export { getProgramVersion, handleProgramVersionResize };
