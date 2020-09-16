import {
  ServerMessage,
  ServerMessageType,
} from './../../shared/communication/ServerMessage';
import { JsonSocket } from '@amatiasq/json-socket';
import { ClientMessage } from '../../shared/communication/ClientMessage';

export class Socket {
  private readonly socket = new JsonSocket<ServerMessage, ClientMessage>(
    this.uri,
  );
  private readonly listeners = new Map<ServerMessageType, Listener[]>();

  constructor(public readonly uri: string) {
    this.socket.onMessage(e => this.processMessage(e));
  }

  onMessage<T extends ServerMessageType>(
    type: T,
    listener: (message: TypedMessage<T>) => void,
  ) {
    if (this.listeners.has(type)) {
      this.listeners.get(type)!.push(listener as any);
    } else {
      this.listeners.set(type, [listener as any]);
    }
  }

  send(value: ClientMessage) {
    this.socket.send(value);
  }

  private processMessage(message: ServerMessage): void {
    const listeners = this.listeners.get(message.type);

    console.debug(message.type, message);

    if (listeners) {
      listeners.forEach(x => x(message));
    } else {
      console.log(`Unhandled message: ${message.type}`);
    }
  }
}

type Listener = (message: ServerMessage) => void;

type TypedMessage<T extends ServerMessageType> = Extract<
  ServerMessage,
  { type: T }
>;
