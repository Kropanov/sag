import { AMMO_TYPE } from '@/enums';

export const AMMO_DAMAGE: { [type in AMMO_TYPE]: number } = {
  [AMMO_TYPE.DEFAULT]: 2,
  [AMMO_TYPE.ENERGY]: 8,
  [AMMO_TYPE.FIRE]: 5,
  [AMMO_TYPE.ICE]: 4,
  [AMMO_TYPE.POISON]: 4,
  [AMMO_TYPE.TREATMENT]: -8,
  [AMMO_TYPE.WIND]: 9,
  [AMMO_TYPE.LIGHTNING]: 15,
  [AMMO_TYPE.VENOM]: 21,
  [AMMO_TYPE.DIVINE]: 60,
  [AMMO_TYPE.ARCANE]: 95,
};

export const AMMO_EFFECT: { [type in AMMO_TYPE]: any } = {
  [AMMO_TYPE.DEFAULT]: undefined,
  [AMMO_TYPE.ENERGY]: undefined,
  [AMMO_TYPE.FIRE]: undefined,
  [AMMO_TYPE.ICE]: undefined,
  [AMMO_TYPE.POISON]: undefined,
  [AMMO_TYPE.TREATMENT]: undefined,
  [AMMO_TYPE.WIND]: undefined,
  [AMMO_TYPE.LIGHTNING]: undefined,
  [AMMO_TYPE.VENOM]: undefined,
  [AMMO_TYPE.DIVINE]: undefined,
  [AMMO_TYPE.ARCANE]: undefined,
};
