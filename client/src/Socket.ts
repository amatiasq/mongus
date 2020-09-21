import { ServerMessageType } from './../../shared/communication/ServerMessage';
import { JsonSocket } from '@amatiasq/json-socket';
import { ClientMessage } from '../../shared/communication/ClientMessage';
import { ServerMessage } from '../../shared/communication/ServerMessage';

export class Socket extends JsonSocket<ServerMessage, ClientMessage> {
  readonly listeners;

  constructor(uri: string) {
    super(uri);

    this.listeners = new Map<ServerMessageType, Listener[]>();
    this.onMessage(e => this.processMessagePotato(e));
  }

  onMessageType<T extends ServerMessageType>(
    type: T,
    listener: (message: TypedMessage<T>) => void,
  ) {
    if (this.listeners.has(type)) {
      this.listeners.get(type)!.push(listener as any);
    } else {
      this.listeners.set(type, [listener as any]);
    }
  }

  private processMessagePotato(message: ServerMessage): void {
    const listeners = this.listeners.get(message.type);

    console.debug(message.type, message);

    if (listeners) {
      listeners.forEach(x => x(message));
    } else {
      console.log(`Unhandled message: ${message.type}`);
    }
  }
}

export type Listener = (message: ServerMessage) => void;

export type TypedMessage<T extends ServerMessageType> = Extract<
  ServerMessage,
  { type: T }
>;
