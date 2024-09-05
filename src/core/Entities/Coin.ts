import { ItemProps } from '@/interfaces';
import { Item } from './Abstract/Item';

export class Coin extends Item {
  constructor(props: ItemProps) {
    const { amount, cost } = props;

    const newCost = 1;
    const newAmount = amount ?? cost ?? undefined;

    super({ ...props, cost: newCost, amount: newAmount });
  }
}
