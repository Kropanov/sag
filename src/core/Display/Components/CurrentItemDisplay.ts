import { ContainerChild, Graphics, Sprite } from 'pixi.js';
import { HUDComponent, ItemAmount } from '@core/Display';
import { GameManager } from '@core/Managers';
import { Item } from '@core/Entities';
import { ItemType } from '@enums';
import { theme } from '@config';

export class CurrentItemDisplay extends HUDComponent {
  private game: GameManager = new GameManager();

  // private uiAmmo!: AmmoCounter;
  private container!: Graphics;
  private currentItemSprite!: Sprite;
  private currentItem!: Item | null;

  public alwaysVisible = true;

  constructor() {
    super();
    this.render();
    this.addChild(this.container);
  }

  public render(): Array<ContainerChild> {
    this.width = 300;
    this.height = 150;
    this.x = this.game.size.getWidth() - 300;

    this.container = new Graphics().roundRect(0, 0, 300, 150, 10).fill({ color: theme.background.primary });
    // this.container.x = this.game.size.getWidth() - 300;
    this.container.zIndex = 1;

    return [this.container];
  }

  // FIXME: move to another place
  public setCurrentItem(selectedItem: Item | null) {
    if (selectedItem === null) {
      this.currentItem = null;
      this.resetContainer();
      this.renderCurrentItemSprite('empty');
      return;
    }

    if (this.currentItem === selectedItem) {
      return;
    }

    this.currentItem = selectedItem;

    this.resetContainer();
    this.renderCurrentItemSprite(selectedItem.spriteId);

    switch (selectedItem.type) {
      case ItemType.Gun:
        // this.uiAmmo = new AmmoCounter();
        // this.addComponent(this.uiAmmo);
        break;
      case ItemType.Artifact:
        this.renderCurrentItemAmount(selectedItem.amount);
        break;
      case ItemType.Currency:
        this.renderCurrentItemAmount(selectedItem.amount);
        break;
      default:
        break;
    }
  }

  renderCurrentItemSprite(spriteId: string) {
    this.currentItemSprite = Sprite.from(spriteId);
    this.currentItemSprite.y += 8;
    this.currentItemSprite.x = this.container.width - 150;
    this.container.addChild(this.currentItemSprite);
  }

  renderCurrentItemAmount(amount: number) {
    const uiAmount = new ItemAmount();
    uiAmount.setItemAmount(amount);
    // this.addComponent(uiAmount);
  }

  resetContainer() {
    while (this.container.children.length > 0) {
      const children = this.container.getChildAt(0);
      this.container.removeChild(children);
    }
  }

  public resize(_screenWidth: number, _screenHeight: number): void {}
}
