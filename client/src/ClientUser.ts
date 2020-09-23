import { Player } from '../../shared/models/Player';
import { deserializeUser, serializeUser, User } from '../../shared/models/User';
import { UserId } from '../../shared/types';

export class ClientUser implements User {
  id!: UserId;
  player!: Player;

  constructor(model: User, readonly isPlayer = false) {
    deserializeUser(this, model);
  }

  toJSON() {
    return serializeUser(this);
  }
}
