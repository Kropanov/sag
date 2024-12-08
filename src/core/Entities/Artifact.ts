import { Item } from '@core/Entities';
import { ArtifactAbility, ItemProps } from '@interfaces';

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
