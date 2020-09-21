import { ClientMessageType } from '../../shared/communication/ClientMessage';
import { ServerMessageType } from '../../shared/communication/ServerMessage';
import { UserId } from '../../shared/types';
import { render } from './canvas';
import { Socket } from './Socket';
import { User } from './User';

const socket = new Socket('ws://localhost:17965');
const uuid = `${Math.random()}${Date.now()}${Math.random()}©AMONGUS®` as UserId;
let users: User[] = [];

requestAnimationFrame(function self() {
  render(users);
  requestAnimationFrame(self);
});

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
  users = data.users.map(x => new User(x, x.id === uuid));
  onUserListChanged();
});

socket.onMessageType(ServerMessageType.USER_CONNECTED, data => {
  users.push(new User(data.user));
  onUserListChanged();
});

socket.onMessageType(ServerMessageType.USER_DISCONNECTED, data => {
  const index = users.findIndex(x => x.id === data.uuid);
  if (index !== -1) {
    users.splice(index, 1);
    onUserListChanged();
  }
});

window.onbeforeunload = () => {
  socket.send({ type: ClientMessageType.LOGOUT });
};

function onUserListChanged() {
  console.log('users', users);
}
