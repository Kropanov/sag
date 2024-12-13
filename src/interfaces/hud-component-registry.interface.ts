import { AmmoCounter, CurrentItemDisplay, InventoryDraft } from '@core/Display';

// Define a type-safe registry for components
export interface HUDComponentRegistry {
  ammo: AmmoCounter;
  currentItem: CurrentItemDisplay;
  // backpack: Inventory;
  backpack: InventoryDraft;
  // Add other components here as needed
}
