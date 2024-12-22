import {
  AmmoCounter,
  CurrentItemDisplay,
  InventoryBag,
  InventoryHoverInfoBox,
  SettingsButton,
  SharedChest,
} from '@core/Display';

// Define a type-safe registry for components
export interface HUDComponentRegistry {
  ammo: AmmoCounter;
  currentItem: CurrentItemDisplay;
  chest: SharedChest;
  backpack: InventoryBag;
  itemInfoBox: InventoryHoverInfoBox;
  settingsButton: SettingsButton;
  // Add other components here as needed
}
