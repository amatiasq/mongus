import {
  ServerMessage,
  ServerMessageType,
} from '../../shared/communication/ServerMessage';
import { UserId } from '../../shared/types';
import { Socket } from './Socket';
import { User } from './User';

const users: User[] = [];

export function login(socket: Socket, uuid: UserId) {
  const user = new User(socket, uuid);

  broadcast({
    type: ServerMessageType.USER_CONNECTED,
    user: user.toJSON(),
  });

  users.push(user);

  socket.send({
    type: ServerMessageType.LOGIN_SUCCESS,
    users: users.map(x => x.toJSON()),
  });

  return user;
}

export function logout(uuid: UserId) {
  const index = users.findIndex(x => x.id === uuid);
  if (index === -1) return;

  users.splice(index, 1);

  broadcast({
    type: ServerMessageType.USER_DISCONNECTED,
    uuid,
  });
}

export function broadcast(message: ServerMessage) {
  for (const user of users) {
    user.socket.send(message);
  }
}
