import { ServerMessage } from './../../shared/communication/ServerMessage';
import { Action } from '../../shared/Action';
import { SerializedUser, serializeUser } from '../../shared/SerializedUser';
import { UserId } from '../../shared/types';
import { Socket } from './Socket';

export class User implements SerializedUser {
  //#region AFK
  private afkSince: number | null = null;
  actions = new Set<Action>();

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

  send(message: ServerMessage) {
    this.socket.send(message);
  }

  toJSON() {
    return serializeUser(this);
  }
}

function rand() {
  return Math.round(Math.random() * 500);
}
