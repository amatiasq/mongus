import { ClientMessageType } from './../../shared/communication/ClientMessage';
import { NiceSocket } from '@amatiasq/nice-socket';
import { ClientMessage } from '../../shared/communication/ClientMessage';
import { ServerMessage } from '../../shared/communication/ServerMessage';

export class Socket {
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
