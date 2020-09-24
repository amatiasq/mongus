import { Entity } from './../../shared/models/Entity';
import { ClientMessageType } from '../../shared/communication/ClientMessage';
import { ServerMessageType } from '../../shared/communication/ServerMessage';
import { DeadBody } from '../../shared/models/DeadBody';
import { User } from '../../shared/models/User';
import { UserId } from '../../shared/types';
import { ClientSocket } from './ClientSocket';
import { ClientUser } from './ClientUser';
import { centerCameraAt, render } from './ui/canvas';
import { watchKeyboard } from './ui/interactions';
import { decompressList } from '../../shared/util';

// const socket = new ClientSocket('ws://localhost:17965');
const socket = new ClientSocket('wss://amongus.amatiasq.com');
const uuid = `${Math.random()}${Date.now()}` as UserId;
let users: ClientUser[] = [];

watchKeyboard(actions =>
  socket.send({
    type: ClientMessageType.USER_ACTIONS,
    actions: Array.from(actions),
  }),
);

socket.onOpen(() =>
  socket.send({
    type: ClientMessageType.LOGIN,
    uuid,
  }),
);

socket.onReconnect(() =>
  socket.send({
    type: ClientMessageType.RECONNECT,
    uuid,
  }),
);

socket.onMessageType(ServerMessageType.LOGIN_SUCCESS, data => {
  users = getUsersFromServer(data.users);
  onUserListChanged();
});

socket.onMessageType(ServerMessageType.USER_CONNECTED, data => {
  users.push(new ClientUser(data.user));
  onUserListChanged();
});

socket.onMessageType(ServerMessageType.USER_DISCONNECTED, data => {
  const index = users.findIndex(x => x.id === data.uuid);
  if (index !== -1) {
    users.splice(index, 1);
    onUserListChanged();
  }
});

let frameUsers: User[];
let frameEntities: Entity[];

socket.onMessageType(ServerMessageType.GAME_STEP, data => {
  frameUsers = decompressList(data.users, frameUsers);
  frameEntities = decompressList(data.entities, frameEntities);
  users = getUsersFromServer(frameUsers);

  const me = users.find(x => x.id === uuid);
  const players = users.map(x => x.player);
  const bodies = frameEntities as DeadBody[];

  if (!me) {
    throw new Error(`Can't find player in user list. UUID-${uuid}`);
  }

  centerCameraAt(me.player.position);
  render(players, bodies);
});

window.onbeforeunload = () => {
  socket.send({ type: ClientMessageType.LOGOUT });
};

function getUsersFromServer(list: User[]) {
  return list.map(x => new ClientUser(x, x.id === uuid));
}

function onUserListChanged() {
  console.log('users', users);
}
