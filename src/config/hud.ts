import { AmmoCounter, CurrentItemDisplay, InventoryBag, SharedChest } from '@core/Display';
import { HUDComponentRegistry } from '@interfaces';

export const hudComponents: HUDComponentRegistry = {
  ammo: new AmmoCounter(),
  currentItem: new CurrentItemDisplay(),
  chest: new SharedChest(),
  backpack: new InventoryBag(),
  // backpack: new Inventory(),
  // Add other components here
};
