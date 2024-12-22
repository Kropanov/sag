import {
  AmmoCounter,
  CurrentItemDisplay,
  InventoryBag,
  InventoryHoverInfoBox,
  SettingsButton,
  SharedChest,
} from '@core/Display';
import { HUDComponentRegistry } from '@interfaces';

export const hudComponents: HUDComponentRegistry = {
  ammo: new AmmoCounter(),
  currentItem: new CurrentItemDisplay(),
  chest: new SharedChest(),
  backpack: new InventoryBag(),
  itemInfoBox: new InventoryHoverInfoBox(),
  settingsButton: new SettingsButton(),
  // Add other components here
};
