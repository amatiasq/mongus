import { SerializedUser, serializeUser } from '../../shared/SerializedUser';
import { UserId } from '../../shared/types';
import { Socket } from './Socket';

export class User implements SerializedUser {
  //#region AFK
  private afkSince: number | null = null;

  get isAfk() {
    return this.afkSince != null && Date.now() - this.afkSince > 1000;
  }

  afk() {
    this.afkSince = Date.now();
  }

  back() {
    this.afkSince = null;
  }
  //#endregion

  position = { x: rand(), y: rand() };

  constructor(readonly socket: Socket, readonly id: UserId) {}

  toJSON() {
    return serializeUser(this);
  }
}

function rand() {
  return Math.round(Math.random() * 500);
}
