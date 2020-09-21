import { RoomMessage } from './RoomMessage';
import { UserId, UserName } from '../types';
import { ClientToClientMessage } from './ClientToClientMessage';

export enum ClientMessageType {
  ERROR = 'ERROR',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  RECONNECT = 'RECONNECT',
}

interface ClientMessage__ERROR {
  type: ClientMessageType.ERROR;
  message: string;
}

interface ClientMessage__LOGIN {
  type: ClientMessageType.LOGIN;
  uuid: UserId;
}

interface ClientMessage__RECONNECT {
  type: ClientMessageType.RECONNECT;
  uuid: UserId;
}

interface ClientMessage__LOGOUT {
  type: ClientMessageType.LOGOUT;
}

// interface ClientMessage__SEND_TO_ROOM {
//   type: ClientMessageType.SEND_TO_ROOM;
//   message: RoomMessage;
// }

// interface ClientMessage__SEND_TO_USER {
//   type: ClientMessageType.SEND_TO_USER;
//   to: UserId;
//   message: ClientToClientMessage;
// }

export type ClientMessage =
  | ClientMessage__ERROR
  | ClientMessage__LOGIN
  | ClientMessage__RECONNECT
  | ClientMessage__LOGOUT;
// | ClientMessage__SEND_TO_ROOM
// | ClientMessage__SEND_TO_USER;
