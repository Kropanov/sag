import { Text } from 'pixi.js';
import { GameManager } from '@/core/Manager';

function getProgramVersion() {
  const manager = GameManager.getInstance();

  const version = new Text({
    text: 'v0.0.0 beta',
    style: {
      fontFamily: 'Consolas',
      fontSize: 20,
      fill: '#ADADAD',
    },
  });

  version.x = manager.getWidth() - version.width - 8;
  version.y = manager.getHeight() - version.height - 5;

  return version;
}

function handleProgramVersionResize(version: Text, screenWidth: number, screenHeight: number) {
  version.x = screenWidth - version.width - 8;
  version.y = screenHeight - version.height - 5;
}

export { getProgramVersion, handleProgramVersionResize };
