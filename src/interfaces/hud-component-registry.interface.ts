import { AmmoCounter } from '@core/Display';

// Define a type-safe registry for components
export interface HUDComponentRegistry {
  ammo: AmmoCounter;
  // Add other components here as needed
}
