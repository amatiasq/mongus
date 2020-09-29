import equal from 'fast-deep-equal/es6';

import { Action } from '../../shared/Action';
import {
  ServerMessage,
  ServerMessageType,
} from '../../shared/communication/ServerMessage';
import { serializeUser, User } from '../../shared/models/User';
import { UserId, UserName } from '../../shared/types';
import { compressList } from '../../shared/util';
import { ServerPlayer } from './entities/ServerPlayer';
import { ServerSocket } from './ServerSocket';

const CONNECTION_TIMEOUT_SECONDS = 1;
const AFK_AFTER_SECONDS = 10;

export class ServerUser implements User {
  player;

  private lastAction = Date.now();
  private disconnectedAt: number | null = null;
  private readonly missedMessages: ServerMessage[] = [];
  private lastFrame!: ServerMessage & { type: ServerMessageType.GAME_STEP };

  get hasLostConnection() {
    return (
      this.disconnectedAt &&
      secondsSince(this.disconnectedAt) > CONNECTION_TIMEOUT_SECONDS
    );
  }

  get isAfk() {
    return secondsSince(this.lastAction) > AFK_AFTER_SECONDS;
  }

  constructor(
    private socket: ServerSocket,
    readonly id: UserId,
    name: UserName,
  ) {
    this.player = new ServerPlayer(name);
  }

  setActions(actions: Action[]) {
    this.lastAction = Date.now();
    this.player.setActions(actions);
  }

  disconnected() {
    this.disconnectedAt = Date.now();
  }

  reconnected(socket: ServerSocket) {
    this.disconnectedAt = null;
    this.socket = socket;

    this.missedMessages.forEach(x => socket.send(x));
    this.missedMessages.length = 0;
  }

  send(message: ServerMessage) {
    if (this.disconnectedAt) {
      this.missedMessages.push(message);
    } else if (message.type !== ServerMessageType.GAME_STEP) {
      this.socket.send(message);
    } else {
      const msg = this.compress(message);
      if (msg) {
        this.socket.send(msg);
      }
    }
  }

  private compress(
    data: ServerMessage & { type: ServerMessageType.GAME_STEP },
  ) {
    const last = this.lastFrame;
    this.lastFrame = data;

    if (!last) {
      return data;
    }

    const users = compressList(equal, last.users, data.users);
    const entities = compressList(equal, last.entities, data.entities);

    return users || entities ? { type: data.type, users, entities } : null;
  }

  toJSON() {
    return serializeUser(this);
  }
}

function secondsSince(timestamp: number) {
  return (Date.now() - timestamp) / 1000;
}
