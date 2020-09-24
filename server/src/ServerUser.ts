import { Action } from '../../shared/Action';
import { ServerMessage } from '../../shared/communication/ServerMessage';
import { serializeUser, User } from '../../shared/models/User';
import { UserId } from '../../shared/types';
import { ServerPlayer } from './entities/ServerPlayer';
import { ServerSocket } from './ServerSocket';

const CONNECTION_TIMEOUT_SECONDS = 1;
const AFK_AFTER_SECONDS = 10;

export class ServerUser implements User {
  player = new ServerPlayer();

  private lastAction = Date.now();
  private disconnectedAt: number | null = null;
  private readonly missedMessages: ServerMessage[] = [];

  get hasLostConnection() {
    return (
      this.disconnectedAt &&
      secondsSince(this.disconnectedAt) > CONNECTION_TIMEOUT_SECONDS
    );
  }

  get isAfk() {
    return secondsSince(this.lastAction) > AFK_AFTER_SECONDS;
  }

  constructor(private socket: ServerSocket, readonly id: UserId) {}

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
    } else {
      this.socket.send(message);
    }
  }

  toJSON() {
    return serializeUser(this);
  }
}

function secondsSince(timestamp: number) {
  return (Date.now() - timestamp) / 1000;
}
