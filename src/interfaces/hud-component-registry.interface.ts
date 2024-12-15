import { AmmoCounter, CurrentItemDisplay, InventoryDraft, SharedChest } from '@core/Display';

// Define a type-safe registry for components
export interface HUDComponentRegistry {
  ammo: AmmoCounter;
  currentItem: CurrentItemDisplay;
  // backpack: Inventory;
  backpack: InventoryDraft;
  chest: SharedChest;
  // chest: Shar;
  // Add other components here as needed
}
