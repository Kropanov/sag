import { ItemFactory } from '@core/Entities';
import CreatureFactory from '@core/Entities/Factory/CreatureFactory.ts';

class GameFactory {
  private static _instance: GameFactory;
  public itemFactory!: ItemFactory;
  public creatureFactory!: CreatureFactory;

  constructor() {
    if (GameFactory._instance) {
      return GameFactory._instance;
    }

    this.itemFactory = new ItemFactory();
    this.creatureFactory = new CreatureFactory();

    GameFactory._instance = this;
  }

  async loadTemplates() {
    await this.itemFactory.loadItemTemplates();
  }
}

export default GameFactory;