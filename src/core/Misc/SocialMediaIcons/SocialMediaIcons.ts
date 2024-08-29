import { GITHUB_REP_LINK } from '@/config';
import { GameManager } from '@/core/Manager';
import { Container, Sprite } from 'pixi.js';

function getSocialMediaIcons() {
  const manager = GameManager.getInstance();
  const container = new Container();

  const githubIcon = Sprite.from('github_white');
  container.addChild(githubIcon);

  githubIcon.scale = 0.12;

  githubIcon.eventMode = 'dynamic';
  githubIcon.interactive = true;
  githubIcon.cursor = 'pointer';

  githubIcon.on('pointertap', () => {
    window.open(GITHUB_REP_LINK);
  });

  handleSocialMediaIconsResize(container, manager.getWidth(), manager.getHeight());

  return container;
}

function handleSocialMediaIconsResize(container: Container, _screenWidth: number, screenHeight: number) {
  container.x = 7;
  container.y = screenHeight - container.getChildAt(0).height - 5;
}

export { getSocialMediaIcons, handleSocialMediaIconsResize };
