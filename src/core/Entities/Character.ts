import { Backpack } from './Backpack';
import { rectIntersect } from '@utils';
import { Creature, Item } from '@core/Entities';

export class Character extends Creature {
  health: number;
  attackPower: number;
  defensePower: number;

  private backpack: Backpack;

  constructor(texture: string, x: any, y: any, backpack: Backpack) {
    super(texture, x, y);
    this.health = 100;
    this.attackPower = 10;
    this.defensePower = 5;
    this.backpack = backpack;
  }

  public pushItemToBackpack(item: Item) {
    this.backpack.push(item);
  }

  public addItemToBackpackAt(item: Item, index: number) {
    this.backpack.placeItem(item, index);
  }

  public reassignItemAt(item: Item, index: number) {
    this.backpack.moveItemTo(item, index);
  }

  public removeItemFromBackpack(item: Item) {
    this.backpack.remove(item);
  }

  public getBackpackItems(): Array<Item | null> {
    return this.backpack.open();
  }

  public move(dx: number, dy: number) {
    this.vx = dx;
    this.vy = dy;
  }

  public attack(target: { takeDamage: (arg0: any) => void }) {
    target.takeDamage(this.attackPower);
  }

  public takeDamage(amount: number) {
    this.health -= amount;
    if (this.health <= 0) {
      this.die();
    }
  }

  public die() {
    this.sprite.visible = false;
  }

  checkCollision(other: any) {
    return rectIntersect(
      this.sprite.x,
      this.sprite.y,
      this.sprite.width,
      this.sprite.height,
      other.sprite.x,
      other.sprite.y,
      other.sprite.width,
      other.sprite.height,
      this.sprite.anchor.x,
      this.sprite.anchor.y,
      other.sprite.anchor.x,
      other.sprite.anchor.y,
    );
  }
}
