import { RoomMessage } from './RoomMessage';
import { SerializedUser } from '../SerializedUser';
import { UserId, UserName } from '../types';
import { ClientToClientMessage } from './ClientToClientMessage';

export enum ServerMessageType {
  ERROR = 'ERROR',
  HANDSHAKE = 'HANDSHAKE',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  USER_CONNECTED = 'USER_CONNECTED',
  USER_DISCONNECTED = 'USER_DISCONNECTED',
  MESSAGE_FROM_USER = 'MESSAGE_FROM_USER',
  MESSAGE_TO_ROOM = 'MESSAGE_TO_ROOM',
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
  // success: true;
  // name: UserName;
  users: SerializedUser[];
}

// interface ServerMessage__LOGIN_RESULT__FAIL {
//   type: ServerMessageType.LOGIN_SUCCESS;
//   success: false;
//   message: string;
// }

interface ServerMessage__USER_CONNECTED {
  type: ServerMessageType.USER_CONNECTED;
  user: SerializedUser;
}

interface ServerMessage__USER_DISCONNECTED {
  type: ServerMessageType.USER_DISCONNECTED;
  uuid: UserId;
}

interface ServerMessage__MESSAGE_TO_ROOM {
  type: ServerMessageType.MESSAGE_TO_ROOM;
  from: UserId;
  message: RoomMessage;
}

interface ServerMessage__MESSAGE_FROM_USER {
  type: ServerMessageType.MESSAGE_FROM_USER;
  from: UserId;
  message: ClientToClientMessage;
}

export type ServerMessage =
  | ServerMessage__ERROR
  | ServerMessage__HANDSHAKE
  | ServerMessage__LOGIN_RESULT__SUCCESS
  // | ServerMessage__LOGIN_RESULT__FAIL
  | ServerMessage__USER_CONNECTED
  | ServerMessage__USER_DISCONNECTED
  | ServerMessage__MESSAGE_TO_ROOM
  | ServerMessage__MESSAGE_FROM_USER;
