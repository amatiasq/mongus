import { EntityType } from '../../../shared/models/Entity';
import {
  deserializePlayer,
  Player,
  serializePlayer,
} from '../../../shared/models/Player';
import { User } from '../../../shared/models/User';
import { Orientation } from '../../../shared/Orientation';
import { UserName } from '../../../shared/types';
import { Vector } from '../../../shared/Vector';

export class ClientPlayer implements Player {
  type!: EntityType.Player;
  name!: UserName;
  isDead!: boolean;
  color!: '[string HexColor]';
  position!: Vector;
  orientation!: Orientation;
  speed!: number;

  get isUser() {
    return this.user != null;
  }

  constructor(data: Player, readonly user: User | null) {
    deserializePlayer(this, data);
  }

  toJSON() {
    return serializePlayer(this);
  }
}
