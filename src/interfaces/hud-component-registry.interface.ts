import { AmmoCounter, CurrentItemDisplay } from '@core/Display';

// Define a type-safe registry for components
export interface HUDComponentRegistry {
  ammo: AmmoCounter;
  currentItem: CurrentItemDisplay;
  // Add other components here as needed
}
