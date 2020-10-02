import { UserId, UserName } from '../types';
import { Action } from '../Action';
import { Message } from './Message';

export enum ClientMessageType {
  ERROR = 'ERROR',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  RECONNECT = 'RECONNECT',
  USER_ACTIONS = 1,
  SET_OBSTACLES = 'SET_OBSTACLES',
}

interface ClientMessage__ERROR extends Message<ClientMessageType> {
  type: ClientMessageType.ERROR;
  data: {
    message: string;
  };
}

interface ClientMessage__LOGIN extends Message<ClientMessageType> {
  type: ClientMessageType.LOGIN;
  data: {
    uuid: UserId;
    username: UserName;
  };
}

interface ClientMessage__LOGOUT extends Message<ClientMessageType> {
  type: ClientMessageType.LOGOUT;
}

interface ClientMessage__RECONNECT extends Message<ClientMessageType> {
  type: ClientMessageType.RECONNECT;
  data: {
    uuid: UserId;
    username: UserName;
  };
}

interface ClientMessage__USER_ACTIONS extends Message<ClientMessageType> {
  type: ClientMessageType.USER_ACTIONS;
  data: {
    actions: Action[];
  };
}

interface ClientMessage__SET_OBSTACLES extends Message<ClientMessageType> {
  type: ClientMessageType.SET_OBSTACLES;
  data: {
    obstacles: Array<Rectangle>;
  };
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
