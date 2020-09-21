import { UserId } from '../../shared/types';
import { SerializedUser, serializeUser } from '../../shared/SerializedUser';

export class User implements SerializedUser {
  id;
  position = { x: 0, y: 0 };

  constructor({ id, position }: SerializedUser, readonly isPlayer = false) {
    this.id = id;
    this.position = position;
  }

  toJSON() {
    return serializeUser(this);
  }
}
