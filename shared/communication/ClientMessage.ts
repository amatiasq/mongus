import { UserId, UserName } from '../types';
import { Action } from '../Action';

export enum ClientMessageType {
  ERROR = 'ERROR',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  RECONNECT = 'RECONNECT',
  USER_ACTIONS = 1,
  SET_OBSTACLES = 'SET_OBSTACLES',
}

interface ClientMessage__ERROR {
  type: ClientMessageType.ERROR;
  message: string;
}

interface ClientMessage__LOGIN {
  type: ClientMessageType.LOGIN;
  uuid: UserId;
  username: UserName;
}

interface ClientMessage__RECONNECT {
  type: ClientMessageType.RECONNECT;
  uuid: UserId;
  username: UserName;
}

interface ClientMessage__LOGOUT {
  type: ClientMessageType.LOGOUT;
}

interface ClientMessage__USER_ACTIONS {
  type: ClientMessageType.USER_ACTIONS;
  actions: Action[];
}

interface ClientMessage__SET_OBSTACLES {
  type: ClientMessageType.SET_OBSTACLES;
  obstacles: Array<Rectangle>;
}

interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type ClientMessage =
  | ClientMessage__ERROR
  | ClientMessage__LOGIN
  | ClientMessage__RECONNECT
  | ClientMessage__LOGOUT
  | ClientMessage__USER_ACTIONS
  | ClientMessage__SET_OBSTACLES;
