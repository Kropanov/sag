import { AmmoCounter, CurrentItemDisplay, InventoryDraft } from '@core/Display';
import { HUDComponentRegistry } from '@interfaces';

export const hudComponents: HUDComponentRegistry = {
  ammo: new AmmoCounter(),
  currentItem: new CurrentItemDisplay(),
  backpack: new InventoryDraft(),
  // backpack: new Inventory(),
  // Add other components here
};
