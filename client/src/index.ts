import { ClientMessageType } from '../../shared/communication/ClientMessage';
import { ServerMessageType } from '../../shared/communication/ServerMessage';
import { DeadBody } from '../../shared/models/DeadBody';
import { Entity } from '../../shared/models/Entity';
import { User } from '../../shared/models/User';
import { UserId, UserName } from '../../shared/types';
import { decompressList } from '../../shared/util';
import { ClientSocket } from './ClientSocket';
import { ClientUser } from './ClientUser';
import { centerCameraAt, render } from './ui/canvas';
import { getUserName, watchKeyboard } from './ui/interactions';

const FORCE_PROD_SERVER = false;
const serverUri =
  location.origin === 'https://amatiasq.github.io' || FORCE_PROD_SERVER
    ? 'wss://amongus.amatiasq.com'
    : 'ws://localhost:17965';

const socket = new ClientSocket(serverUri);
const uuid = `${Math.random()}${Date.now()}` as UserId;

let myName: UserName;
let users: ClientUser[] = [];

watchKeyboard(actions =>
  socket.send({
    type: ClientMessageType.USER_ACTIONS,
    actions: Array.from(actions),
  }),
);

socket.onOpen(() =>
  getUserName().then(username => {
    myName = username;
    socket.send({
      type: ClientMessageType.LOGIN,
      uuid,
      username,
    });
  }),
);

socket.onReconnect(() =>
  socket.send({
    type: ClientMessageType.RECONNECT,
    uuid,
    username: myName,
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
