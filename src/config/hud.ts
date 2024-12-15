import { AmmoCounter, CurrentItemDisplay, InventoryDraft, SharedChest } from '@core/Display';
import { HUDComponentRegistry } from '@interfaces';

export const hudComponents: HUDComponentRegistry = {
  ammo: new AmmoCounter(),
  currentItem: new CurrentItemDisplay(),
  backpack: new InventoryDraft(),
  chest: new SharedChest(),
  // backpack: new Inventory(),
  // Add other components here
};
