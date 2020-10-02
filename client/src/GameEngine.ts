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

export enum EngineHook {
  RECEIVE_MESSAGE,
  SEND_MESSAGE,
  MESSAGE_SENT,
}

export type Hook<In, Out> = (x: In) => Out;

export class GameEngine implements ClientSocket {
  private readonly listeners = emitterWithChannels<ServerMessageType, any>();
  private readonly channels = new Map<EngineHook, Function[]>();
  private readonly pipes = new Map<EngineHook, Function[]>();

  constructor() {
    this.register<ServerMessage>(EngineHook.RECEIVE_MESSAGE, ({ type, data }) =>
      this.listeners(type, data),
    );
  }

  send: MessageWriter<ClientMessage> = (type, data) =>
    this.trigger(EngineHook.SEND_MESSAGE, { type, data });

  onMessage: MessageReader<ServerMessage> = (type, handler) =>
    this.listeners.subscribe(type, handler);

  trigger<In>(hook: EngineHook, initial?: In) {
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

  register<T>(hook: EngineHook, handler: (data: T) => void) {
    if (!this.channels.has(hook)) {
      this.channels.set(hook, [handler]);
      return;
    }

    const list = this.channels.get(hook)!;
    list.push(handler);
  }

  pipeline<In>(hook: EngineHook) {
    if (!this.pipes.has(hook)) {
      this.pipes.set(hook, []);
    }

    return this.createPipe<In>(hook);
  }

  private createPipe<In>(hook: EngineHook) {
    return {
      then: <Out>(handler: (value: In) => Out) => {
        this.pipes.get(hook)!.push(handler);
        return this.createPipe<Out>(hook);
      },
    };
  }
}
