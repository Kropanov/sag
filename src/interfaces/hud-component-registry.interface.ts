import { AmmoCounter, CurrentItemDisplay, InventoryBag, InventoryHoverInfoBox, SharedChest } from '@core/Display';

// Define a type-safe registry for components
export interface HUDComponentRegistry {
  ammo: AmmoCounter;
  currentItem: CurrentItemDisplay;
  backpack: InventoryBag;
  chest: SharedChest;
  itemInfoBox: InventoryHoverInfoBox;
  // Add other components here as needed
}
