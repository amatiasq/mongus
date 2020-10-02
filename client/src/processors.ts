import { ClientMessage } from '../../shared/communication/ClientMessage';
import {
  ServerMessage,
  ServerMessageType,
} from '../../shared/communication/ServerMessage';
import { Entity } from '../../shared/models/Entity';
import { User } from '../../shared/models/User';
import { decompressList } from '../../shared/util';

export function serialize(message: ClientMessage) {
  return JSON.stringify(message);
}

export function deserialize(event: MessageEvent<string>) {
  try {
    return JSON.parse(event.data) as ServerMessage;
  } catch (error) {
    throw new Error(`Invalid JSON (${error.message}): "${event.data}"`);
  }
}

export function compress(message: ClientMessage) {
  return message;
}

let users: User[];
let entities: Entity[];

export function decompress(message: ServerMessage) {
  if (message.type != ServerMessageType.GAME_STEP) {
    return message;
  }

  const { data } = message;
  users = decompressList(data.users, users);
  entities = decompressList(data.entities, entities);
  return { ...message, data: { ...message.data, users, entities } };
}
