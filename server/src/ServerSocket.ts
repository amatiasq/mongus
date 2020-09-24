import { NiceSocket, NiceSocketServer } from '@amatiasq/nice-socket';
import { createServer } from 'http';

import {
  ClientMessage,
  ClientMessageType,
} from '../../shared/communication/ClientMessage';
import { ServerMessage } from '../../shared/communication/ServerMessage';

export function createSocketServer() {
  const port = process.env.PORT || 17965;
  const server = createServer();
  const webSocketServer = new NiceSocketServer<ClientMessage, ServerMessage>(
    server,
  );

  server.listen(port, () => console.log(`Websocket server ready at ${port}`));
  return webSocketServer;
}

export class ServerSocket {
  private readonly listeners = new Map<ClientMessageType, Listener[]>();

  constructor(
    private readonly socket: NiceSocket<ClientMessage, ServerMessage>,
  ) {
    this.socket.onJsonMessage(e => this.processMessagePotato(e));
  }

  onClose(listener: () => void) {
    this.socket.on('close', listener);
  }

  onMessageType<T extends ClientMessageType>(
    type: T,
    listener: (message: TypedMessage<T>) => void,
  ) {
    if (this.listeners.has(type)) {
      this.listeners.get(type)!.push(listener as any);
    } else {
      this.listeners.set(type, [listener as any]);
    }
  }

  send(data: ServerMessage) {
    this.socket.sendJson(data);
  }

  private processMessagePotato(message: ClientMessage): void {
    const listeners = this.listeners.get(message.type);

    console.debug(message.type, message);

    if (listeners) {
      listeners.forEach(x => x(message));
    } else {
      console.log(`Unhandled message: ${message.type}`);
    }
  }
}

export type Listener = (message: ClientMessage) => void;

export type TypedMessage<T extends ClientMessageType> = Extract<
  ClientMessage,
  { type: T }
>;
