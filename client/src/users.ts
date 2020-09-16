import { SerializedUser } from '../../shared/SerializedUser';
import { renderUsers } from './ui';
import { UserId, UserName } from '../../shared/types';
import { User } from './User';

let users: User[] = [];

export function getUserById(id: UserId) {
  return users.find(x => x.id === id);
}

export function getUserByName(name: UserName) {
  return users.find(x => x.name === name);
}

export function setUserList(list: SerializedUser[]) {
  users = list.map(unserializeUser).map(x => getUserById(x.id) || x);
  refreshUserList();
}

function unserializeUser(user: SerializedUser) {
  return new User(user);
}

export function userConnected(user: SerializedUser) {
  console.log('CONNECTED', user);
  users.push(unserializeUser(user));
  refreshUserList();
}

export function userDisconnected(user: SerializedUser) {
  console.log('DISCONNECTED', user);
  users = users.filter(x => x.id !== user.id);
  refreshUserList();
}

export function getUserList() {
  return users;
}

export function refreshUserList() {
  renderUsers(users);
}
