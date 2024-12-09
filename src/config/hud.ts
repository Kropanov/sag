import { AmmoCounter, CurrentItemDisplay } from '@core/Display';
import { HUDComponentRegistry } from '@interfaces';

export const hudComponents: HUDComponentRegistry = {
  ammo: new AmmoCounter(),
  currentItem: new CurrentItemDisplay(),
  // Add other components here
};
