import { ClientMessageType } from '../../shared/communication/ClientMessage';
import { ServerMessageType } from '../../shared/communication/ServerMessage';
import { gameStep } from './game/behaviour';
import { startLoop } from './game/loop';
import { Universe } from './game/Universe';
import { createSocketServer, ServerSocket } from './ServerSocket';
import { ServerUser } from './ServerUser';
import { broadcast, getAllUsers, getUserById, login, logout } from './users';

const webSocketServer = createSocketServer();
const universe = new Universe();

startLoop(delta => {
  universe.setPlayers(getAllUsers().map(x => x.player));

  gameStep(delta, universe);

  broadcast({
    type: ServerMessageType.GAME_STEP,
    users: getAllUsers().map(x => x.toJSON()),
    entities: universe.toJSON(),
  });
});

webSocketServer.onConnection(nice => {
  const socket = new ServerSocket(nice);
  let user: ServerUser;

  socket.onClose(() => user && user.disconnected());

  socket.onMessageType(ClientMessageType.RECONNECT, data => {
    const user =
      getUserById(data.uuid) || login(socket, data.uuid, data.username);

    user.reconnected(socket);
    onUserConnected(user, socket);
  });

  socket.onMessageType(ClientMessageType.LOGIN, data => {
    user = login(socket, data.uuid, data.username);
    onUserConnected(user, socket);
  });

  socket.send({ type: ServerMessageType.HANDSHAKE });
});

function onUserConnected(user: ServerUser, socket: ServerSocket) {
  socket.onMessageType(ClientMessageType.USER_ACTIONS, data =>
    user.setActions(data.actions),
  );

  socket.onMessageType(ClientMessageType.LOGOUT, data => logout(user.id));
}
