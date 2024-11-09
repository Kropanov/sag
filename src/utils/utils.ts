import { Item } from '@core/Entities';

const isStackable = (item: Item) => {
  return item.amount != 1;
};

export { isStackable };
