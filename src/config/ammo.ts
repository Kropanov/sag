import { AMMO_TYPE } from '@/types/ammo.enum';

export const AMMO_DAMAGE: { [type in AMMO_TYPE]: number } = {
  [AMMO_TYPE.DEFAULT]: 4,
  [AMMO_TYPE.ENERGY]: 8,
  [AMMO_TYPE.FIRE]: 5,
  [AMMO_TYPE.ICE]: 4,
};

export const AMMO_EFFECT: { [type in AMMO_TYPE]: any } = {
  [AMMO_TYPE.DEFAULT]: undefined,
  [AMMO_TYPE.ENERGY]: undefined,
  [AMMO_TYPE.FIRE]: undefined,
  [AMMO_TYPE.ICE]: undefined,
};
