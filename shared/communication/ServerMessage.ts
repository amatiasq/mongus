import { Entity } from '../models/Entity';
import { Obstacle } from '../models/Obstacle';
import { User } from '../models/User';
import { UserId } from '../types';

export enum ServerMessageType {
  ERROR = 'ERROR',
  HANDSHAKE = 'HANDSHAKE',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  USER_CONNECTED = 'USER_CONNECTED',
  USER_DISCONNECTED = 'USER_DISCONNECTED',
  MESSAGE_FROM_USER = 'MESSAGE_FROM_USER',
  MESSAGE_TO_ROOM = 'MESSAGE_TO_ROOM',
  GAME_STEP = 1,
}

interface ServerMessage__ERROR {
  type: ServerMessageType.ERROR;
  message: string;
}

interface ServerMessage__HANDSHAKE {
  type: ServerMessageType.HANDSHAKE;
}

interface ServerMessage__LOGIN_RESULT__SUCCESS {
  type: ServerMessageType.LOGIN_SUCCESS;
  users: User[];
  obstacles: Obstacle[];
}

interface ServerMessage__USER_CONNECTED {
  type: ServerMessageType.USER_CONNECTED;
  user: User;
}

interface ServerMessage__USER_DISCONNECTED {
  type: ServerMessageType.USER_DISCONNECTED;
  uuid: UserId;
}

interface ServerMessage__GAME_STEP {
  type: ServerMessageType.GAME_STEP;
  users: User[];
  entities: Entity[];
}

export type ServerMessage =
  | ServerMessage__ERROR
  | ServerMessage__HANDSHAKE
  | ServerMessage__LOGIN_RESULT__SUCCESS
  | ServerMessage__USER_CONNECTED
  | ServerMessage__USER_DISCONNECTED
  | ServerMessage__GAME_STEP;
