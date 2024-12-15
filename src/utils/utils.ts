import { Item } from '@core/Entities';

const isStackable = (item: Item): boolean => {
  return item.amount != 1;
};

const getScreenWidth = (): number => {
  return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
};

const getScreenHeight = (): number => {
  return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
};

export { isStackable, getScreenWidth, getScreenHeight };
