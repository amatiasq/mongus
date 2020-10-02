import { createServer } from 'http';

import { emitterWithChannels } from '@amatiasq/emitter';
import { NiceSocket, NiceSocketServer } from '@amatiasq/nice-socket';

import {
  ClientMessage,
  ClientMessageType,
} from '../../shared/communication/ClientMessage';
import {
  MessageReader,
  MessageWriter,
} from '../../shared/communication/Message';
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
  private readonly listeners = emitterWithChannels<
    ClientMessageType,
    Function
  >();

  constructor(
    private readonly socket: NiceSocket<ClientMessage, ServerMessage>,
  ) {
    this.socket.onJsonMessage(e => this.processMessageExtended(e));
  }

  onClose(listener: () => void) {
    this.socket.on('close', listener);
  }

  onMessage: MessageReader<ClientMessage> = (type, listener) => {
    this.listeners.subscribe(type, listener);
  };

  send: MessageWriter<ServerMessage> = (type, data) =>
    this.socket.sendJson({ type, data } as ServerMessage);

  private processMessageExtended(message: ClientMessage): void {
    if (!this.listeners(message.type, message.data)) {
      console.log(`Unhandled message: ${message.type}`);
    }
  }
}
