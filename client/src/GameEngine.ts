import { emitterWithChannels } from '@amatiasq/emitter';

import { ClientMessage } from '../../shared/communication/ClientMessage';
import {
  MessageReader,
  MessageWriter,
} from '../../shared/communication/Message';
import {
  ServerMessage,
  ServerMessageType,
} from '../../shared/communication/ServerMessage';
import { ClientSocket } from './ClientSocket';

export enum Hook {
  RECEIVE_MESSAGE,
  SEND_MESSAGE,
  MESSAGE_SENT,
}

export class GameEngine implements ClientSocket {
  private readonly listeners = emitterWithChannels<ServerMessageType, any>();
  private readonly channels = new Map<Hook, Function[]>();
  private readonly pipes = new Map<Hook, Function[]>();

  constructor() {
    this.register<ServerMessage>(Hook.RECEIVE_MESSAGE, ({ type, data }) =>
      this.listeners(type, data),
    );
  }

  send: MessageWriter<ClientMessage> = (type, data) =>
    this.trigger(Hook.SEND_MESSAGE, { type, data });

  onMessage: MessageReader<ServerMessage> = (type, handler) =>
    this.listeners.subscribe(type, handler);

  trigger<In>(hook: Hook, initial?: In) {
    const pipes = this.pipes.get(hook);
    const channels = this.channels.get(hook);

    if (!pipes && !channels) return;

    const event = pipes
      ? pipes.reduce((value, fn) => fn(value), initial)
      : initial;

    if (channels) {
      channels.forEach(x => x(event));
    }
  }

  register<T>(hook: Hook, handler: (data: T) => void) {
    if (!this.channels.has(hook)) {
      this.channels.set(hook, [handler]);
      return;
    }

    const list = this.channels.get(hook)!;
    list.push(handler);
  }

  pipeline<In>(hook: Hook) {
    if (!this.pipes.has(hook)) {
      this.pipes.set(hook, []);
    }

    return this.createPipe<In>(hook);
  }

  private createPipe<In>(hook: Hook) {
    return {
      then: <Out>(handler: (value: In) => Out) => {
        this.pipes.get(hook)!.push(handler);
        return this.createPipe<Out>(hook);
      },
    };
  }
}
