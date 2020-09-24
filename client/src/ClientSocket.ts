import { JsonSocket } from '@amatiasq/json-socket';

import { ClientMessage } from '../../shared/communication/ClientMessage';
import {
  ServerMessage,
  ServerMessageType,
} from '../../shared/communication/ServerMessage';

export class ClientSocket extends JsonSocket<ServerMessage, ClientMessage> {
  readonly listeners;

  constructor(uri: string) {
    super(uri);

    this.listeners = new Map<ServerMessageType, Listener[]>();
    this.onMessage(e => this.processMessageExtended(e));
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

  private processMessageExtended(message: ServerMessage): void {
    const listeners = this.listeners.get(message.type);

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
