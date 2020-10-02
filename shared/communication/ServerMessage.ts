import { Entity } from '../models/Entity';
import { Obstacle } from '../models/Obstacle';
import { User } from '../models/User';
import { UserId } from '../types';
import { Message } from './Message';

export enum ServerMessageType {
  ERROR = 'ERROR',
  HANDSHAKE = 'HANDSHAKE',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  USER_CONNECTED = 'USER_CONNECTED',
  USER_DISCONNECTED = 'USER_DISCONNECTED',
  GAME_STEP = 1,
}

interface ServerMessage__ERROR extends Message<ServerMessageType> {
  type: ServerMessageType.ERROR;
  data: {
    message: string;
  };
}

interface ServerMessage__HANDSHAKE extends Message<ServerMessageType> {
  type: ServerMessageType.HANDSHAKE;
}

interface ServerMessage__LOGIN_RESULT__SUCCESS
  extends Message<ServerMessageType> {
  type: ServerMessageType.LOGIN_SUCCESS;
  data: {
    users: User[];
    obstacles: Obstacle[];
  };
}

interface ServerMessage__USER_CONNECTED extends Message<ServerMessageType> {
  type: ServerMessageType.USER_CONNECTED;
  data: {
    user: User;
  };
}

interface ServerMessage__USER_DISCONNECTED extends Message<ServerMessageType> {
  type: ServerMessageType.USER_DISCONNECTED;
  data: {
    uuid: UserId;
  };
}

interface ServerMessage__GAME_STEP extends Message<ServerMessageType> {
  type: ServerMessageType.GAME_STEP;
  data: {
    users: User[];
    entities: Entity[];
  };
}

export type ServerMessage =
  | ServerMessage__ERROR
  | ServerMessage__HANDSHAKE
  | ServerMessage__LOGIN_RESULT__SUCCESS
  | ServerMessage__USER_CONNECTED
  | ServerMessage__USER_DISCONNECTED
  | ServerMessage__GAME_STEP;
