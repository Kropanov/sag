import { ArtifactAbility } from '@/interfaces';

export class ProtectiveAbility implements ArtifactAbility {
  use() {
    console.log('Protect!');
  }
}

export class ReincarnationAbility implements ArtifactAbility {
  use() {
    console.log('Reincarnation!');
  }
}
