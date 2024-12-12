import { AmmoCounter, CurrentItemDisplay, Inventory } from '@core/Display';

// Define a type-safe registry for components
export interface HUDComponentRegistry {
  ammo: AmmoCounter;
  currentItem: CurrentItemDisplay;
  backpack: Inventory;
  // Add other components here as needed
}
