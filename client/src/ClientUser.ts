import { Player } from '../../shared/models/Player';
import { deserializeUser, serializeUser, User } from '../../shared/models/User';
import { UserId } from '../../shared/types';
import { ClientPlayer } from './entities/ClientPlayer';

export class ClientUser implements User {
  id!: UserId;
  player!: ClientPlayer;

  get name() {
    return this.player.name;
  }

  constructor(model: User, readonly isPlayer = false) {
    deserializeUser(this, model);
  }

  toJSON() {
    return serializeUser(this);
  }
}
