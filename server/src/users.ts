import { MessageWriter } from '../../shared/communication/Message';
import {
  ServerMessage,
  ServerMessageType,
} from '../../shared/communication/ServerMessage';
import { UserId, UserName } from '../../shared/types';
import { getObstacles } from './obstacles';
import { ServerSocket } from './ServerSocket';
import { ServerUser } from './ServerUser';

let users: ServerUser[] = [];

export function getAllUsers() {
  return users;
}

export function getUserById(uuid: UserId) {
  return users.find(x => x.id === uuid);
}

export async function login(
  socket: ServerSocket,
  uuid: UserId,
  name: UserName,
) {
  const user = new ServerUser(socket, uuid, name);

  broadcast(ServerMessageType.USER_CONNECTED, { user: user.toJSON() });

  users.push(user);

  socket.send(ServerMessageType.LOGIN_SUCCESS, {
    users: users.map(x => x.toJSON()),
    obstacles: await getObstacles(),
  });

  return user;
}

export function logout(uuid: UserId) {
  const index = users.findIndex(x => x.id === uuid);
  if (index === -1) return;

  users.splice(index, 1);

  broadcast(ServerMessageType.USER_DISCONNECTED, { uuid });
}

export function clean() {
  const remove: ServerUser[] = [];
  const stay: ServerUser[] = [];

  users.forEach(user =>
    user.hasLostConnection ? remove.push(user) : stay.push(user),
  );

  users = stay;
  return remove;
}

export const broadcast: MessageWriter<ServerMessage> = (type, data) => {
  for (const user of users) {
    user.send(type, data);
  }
};
