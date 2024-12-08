import { AmmoCounter } from '@core/Display';
import { HUDComponentRegistry } from '@interfaces';

export const hudComponents: HUDComponentRegistry = {
  ammo: new AmmoCounter(),
  // Add other components here
};
