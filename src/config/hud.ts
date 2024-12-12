import { AmmoCounter, CurrentItemDisplay, Inventory } from '@core/Display';
import { HUDComponentRegistry } from '@interfaces';

export const hudComponents: HUDComponentRegistry = {
  ammo: new AmmoCounter(),
  currentItem: new CurrentItemDisplay(),
  backpack: new Inventory(),
  // Add other components here
};
