import { SerializedUser, serializeUser } from '../../shared/SerializedUser';
import { Color } from './Color';

export class User {
  id;
  position = { x: 0, y: 0 };
  color;
  isDead;

  constructor(
    { id, position, color, isDead }: SerializedUser,
    readonly isPlayer = false,
  ) {
    this.id = id;
    this.position = position;
    this.color = Color.fromHex(color);
    this.isDead = isDead;
  }

  toJSON() {
    return serializeUser({
      ...this,
      color: this.color.hex,
    });
  }
}
