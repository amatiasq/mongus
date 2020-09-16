import { UserId, UserName } from '../../shared/types';
import { User } from './User';
import { NiceSocket } from './websocket';

const users: User[] = [];

export function getUserById(id: UserId) {
  return users.find(x => x.id === id);
}

export function getUserByName(name: UserName) {
  return users.find(x => x.name === name);
}

export function getUserBySocket(ws: NiceSocket) {
  return users.find(x => x.socket === ws);
}

export function isUsernameAvailable(name: UserName) {
  return users.every(x => x.name !== name);
}

export function registerUser(ws: NiceSocket, name: UserName) {
  const user = new User(ws, name);
  users.push(user);
  return user;
}

export function removeUser(user: User): boolean {
  const index = users.findIndex(x => x.id === user.id);

  if (index === -1) {
    return false;
  }

  users.splice(index, 1);
  console.log(users.map(x => x.name).join());
  return true;
}

export function getConnectedUsers() {
  return Array.from(users);
}
