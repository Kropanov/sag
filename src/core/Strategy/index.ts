import { Character } from '@core/Character';

export class AttackStrategy {
  execute(_character: any, _target: any) {}
}

export class MeleeAttack extends AttackStrategy {
  execute(character: { attackPower: any }, target: { takeDamage: (arg0: any) => void }) {
    target.takeDamage(character.attackPower);
  }
}

export class RangedAttack extends AttackStrategy {
  execute(character: { attackPower: number }, target: { takeDamage: (arg0: number) => void }) {
    target.takeDamage(character.attackPower / 2);
  }
}

export class CharacterWithStrategy extends Character {
  attackStrategy: any;
  constructor(texture: string, x: any, y: any, attackStrategy: any) {
    super(texture, x, y);
    this.attackStrategy = attackStrategy;
  }

  attack(target: any) {
    this.attackStrategy.execute(this, target);
  }
}
