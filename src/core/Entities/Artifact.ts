import { ArtifactAbility, ItemProps } from '@/interfaces';
import { Item } from './Abstract/Item';

export class Artifact extends Item {
  private ability: ArtifactAbility;

  constructor(props: ItemProps, ability: ArtifactAbility) {
    super(props);
    this.ability = ability;
  }

  useAbility() {
    this.ability.use();
  }
}
