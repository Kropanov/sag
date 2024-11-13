import YAML from 'yaml';
import axios from 'axios';
import { ItemTemplate } from '@/types';
import { ItemDTO } from '@/api/dto';
import { ItemProps } from '@/interfaces';
import { ItemType } from '@/types/item-type.enum.ts';
import { Artifact, Item, Player, ReincarnationAbility } from '@core/Entities';
import { Material } from '@core/Entities/Material.ts';

export class ItemFactory {
  private itemTemplates: ItemTemplate[] | [] = [];

  public async loadItemTemplates() {
    const response = await axios.get('items.yml');

    if (response && response.headers && response.headers['content-type'] === 'text/yaml') {
      const data = YAML.parse(response.data);
      this.setItemTemplates(data.items);
    }
  }

  private setItemTemplates(itemTemplates: ItemTemplate[]) {
    this.itemTemplates = itemTemplates;
  }

  public getItemTemplates(): ItemTemplate[] {
    return [...this.itemTemplates];
  }

  // TODO: think about creating class where you can get player from, delete player from params
  public generateItemsForPlayer(_playerId: string, player: Player, itemData: ItemDTO[] | undefined) {
    if (itemData === undefined) {
      return [];
    }

    for (let data of itemData) {
      const template = this.getTemplateById(data.mappingId);
      if (!template) {
        continue;
      }

      const item = this.createItemWithTemplate(template, data);
      if (item) {
        player.addItemToBackpackAt(item, data.position);
      }
    }
  }

  public getTemplateById(mappingId: string): ItemTemplate | null {
    const templates = this.itemTemplates.filter((template) => mappingId === template.id);
    if (templates && templates.length > 0) {
      return templates[0];
    }

    return null;
  }

  public createItemWithTemplate(template: ItemTemplate, data: ItemDTO): Item | undefined {
    const itemProps: ItemProps = {
      name: template.name,
      amount: data.quantity,
      type: template.type,
      cost: template.cost,
      asset: template.asset,
      rarity: template.rarity,
      history: template.history,
      description: template.description,
    };

    let item: Item | undefined;
    switch (template.type) {
      case ItemType.Material:
        item = new Material(itemProps);
        break;
      case ItemType.Artifact:
        item = new Artifact(itemProps, new ReincarnationAbility());
        break;
      case ItemType.Equipment:
        break;
      case ItemType.Currency:
        break;
      case ItemType.Gun:
        break;
      default:
        break;
    }

    return item;
  }

  public generateItemsForVendor() {}
}
