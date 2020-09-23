import { ClientMessageType } from '../../shared/communication/ClientMessage';
import { ServerMessageType } from '../../shared/communication/ServerMessage';
import { DeadBody } from '../../shared/models/DeadBody';
import { EntityType } from '../../shared/models/Entity';
import { Player } from '../../shared/models/Player';
import { UserId } from '../../shared/types';
import { render } from './canvas';
import { ClientSocket } from './ClientSocket';
import { ClientUser } from './ClientUser';
import { watchKeyboard } from './interactions';

// const socket = new ClientSocket('ws://localhost:17965');
const socket = new ClientSocket('wss://amongus.amatiasq.com');
const uuid = `${Math.random()}${Date.now()}${Math.random()}©AMONGUS®` as UserId;
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
  users = data.users.map(x => new ClientUser(x, x.id === uuid));
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

socket.onMessageType(ServerMessageType.GAME_STEP, data => {
  const players: Player[] = [];
  const bodies: DeadBody[] = [];

  data.entities.forEach(entity => {
    if (entity.type === EntityType.Player) {
      players.push(entity as Player);
    } else {
      bodies.push(entity as DeadBody);
    }
  });

  render(players, bodies);
});

window.onbeforeunload = () => {
  socket.send({ type: ClientMessageType.LOGOUT });
};

function onUserListChanged() {
  console.log('users', users);
}
