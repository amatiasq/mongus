import { Action } from '../../shared/Action';
import { ServerMessage } from '../../shared/communication/ServerMessage';
import { SerializedUser, serializeUser } from '../../shared/SerializedUser';
import { UserId } from '../../shared/types';
import { getRandomColor } from './getRandomColor';
import { Socket } from './Socket';

export class User implements SerializedUser {
  private afkSince: number | null = null;
  actions = new Set<Action>();
  position = { x: rand(), y: rand() };
  color = getRandomColor();
  isDead = false;

  get isAfk() {
    return this.afkSince != null && Date.now() - this.afkSince > 1000;
  }

  constructor(readonly socket: Socket, readonly id: UserId) {}

  // player

  die() {
    this.isDead = true;
  }

  // user

  afk() {
    this.afkSince = Date.now();
  }

  back() {
    this.afkSince = null;
  }

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
