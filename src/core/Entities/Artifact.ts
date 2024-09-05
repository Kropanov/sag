import { ItemProps } from '@/interfaces';
import { Item } from './Abstract/Item';

export class Artifact extends Item {
  constructor(props: ItemProps) {
    super(props);
  }
}
