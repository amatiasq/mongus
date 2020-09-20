import { v4 as uuidv4 } from 'uuid';

import { ClientMessage } from '../../shared/communication/ClientMessage';
import { ServerMessage } from '../../shared/communication/ServerMessage';
import { SerializedUser } from '../../shared/SerializedUser';
import { UserId, UserName } from '../../shared/types';
import { ISocket, Socket } from './websocket';

export class User implements SerializedUser, ISocket {
  id = uuidv4() as UserId;

  constructor(public readonly socket: Socket, public readonly name: UserName) {}

  sendJson(value: ServerMessage): void {
    return this.socket.sendJson(value);
  }

  onJsonMessage(listener: (this: ISocket, data: ClientMessage) => void): this {
    this.socket.onJsonMessage(listener);
    return this;
  }

  dispose() {
    this.socket.close();
    (this as any).socket = null;
  }
}
