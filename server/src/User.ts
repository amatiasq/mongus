import { v4 as uuidv4 } from 'uuid';

import { ClientMessage } from '../../shared/communication/ClientMessage';
import { ServerMessage } from '../../shared/communication/ServerMessage';
import { SerializedUser } from '../../shared/SerializedUser';
import { UserId, UserName } from '../../shared/types';
import { INiceSocket, NiceSocket } from './websocket';

export class User implements SerializedUser, INiceSocket {
  id = uuidv4() as UserId;

  constructor(
    public readonly socket: NiceSocket,
    public readonly name: UserName,
  ) {}

  sendJson(value: ServerMessage): void {
    return this.socket.sendJson(value);
  }

  onJsonMessage(
    listener: (this: NiceSocket, data: ClientMessage) => void,
  ): this {
    this.socket.onJsonMessage(listener);
    return this;
  }

  dispose() {
    this.socket.close();
    (this as any).socket = null;
  }
}
