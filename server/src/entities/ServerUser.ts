import equal from 'fast-deep-equal/es6';

import { Action } from '../../../shared/Action';
import {
  MessageData,
  MessageWriter,
} from '../../../shared/communication/Message';
import {
  ServerMessage,
  ServerMessageType,
} from '../../../shared/communication/ServerMessage';
import { serializeUser, User } from '../../../shared/models/User';
import { UserId, UserName } from '../../../shared/types';
import { compressList } from '../../../shared/util';
import { ServerSocket } from '../ServerSocket';
import { ServerPlayer } from './ServerPlayer';

type GameStepData = MessageData<ServerMessage, ServerMessageType.GAME_STEP>;

const CONNECTION_TIMEOUT_SECONDS = 1;
const AFK_AFTER_SECONDS = 10;

export class ServerUser implements User {
  player;

  private lastAction = Date.now();
  private disconnectedAt: number | null = null;
  private readonly missedMessages: ServerMessage[] = [];
  private lastFrame!: GameStepData;

  get hasLostConnection() {
    return (
      this.disconnectedAt &&
      secondsSince(this.disconnectedAt) > CONNECTION_TIMEOUT_SECONDS
    );
  }

  get isAfk() {
    return secondsSince(this.lastAction) > AFK_AFTER_SECONDS;
  }

  private get isDisconnected() {
    return Boolean(this.disconnectedAt);
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

    this.missedMessages.forEach(({ type, data }) => socket.send(type, data));
    this.missedMessages.length = 0;
  }

  send: MessageWriter<ServerMessage> = (type, data) => {
    if (this.isDisconnected) {
      this.missedMessages.push({ type, data } as ServerMessage);
    } else if (type !== ServerMessageType.GAME_STEP) {
      this.socket.send(type, data);
    } else {
      const compressed = this.compress(data);
      if (compressed) {
        this.socket.send(type, compressed);
      }
    }
  };

  private compress(data: GameStepData) {
    const last = this.lastFrame;
    this.lastFrame = data;

    if (!last) {
      return data;
    }

    const users = compressList(equal, last.users, data.users);
    const entities = compressList(equal, last.entities, data.entities);

    return users || entities ? { users, entities } : null;
  }

  toJSON() {
    return serializeUser(this);
  }
}

function secondsSince(timestamp: number) {
  return (Date.now() - timestamp) / 1000;
}
