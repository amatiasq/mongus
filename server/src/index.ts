import { ClientMessageType } from '../../shared/communication/ClientMessage';
import { ServerMessageType } from '../../shared/communication/ServerMessage';
import { ServerUser } from './entities/ServerUser';
import { gameStep } from './game/behaviour';
import { startLoop } from './game/loop';
import { Universe } from './game/Universe';
import { setObstacles } from './obstacles';
import { createSocketServer, ServerSocket } from './ServerSocket';
import { broadcast, getAllUsers, getUserById, login, logout } from './users';

const webSocketServer = createSocketServer();
const universe = new Universe();

startLoop(delta => {
  universe.setPlayers(getAllUsers().map(x => x.player));

  gameStep(delta, universe);

  broadcast(ServerMessageType.GAME_STEP, {
    users: getAllUsers().map(x => x.toJSON()),
    entities: universe.toJSON(),
  });
});

webSocketServer.onConnection(nice => {
  const socket = new ServerSocket(nice);
  let user: ServerUser;

  socket.onClose(() => user && user.disconnected());

  socket.onMessage(ClientMessageType.RECONNECT, async data => {
    const user =
      getUserById(data.uuid) || (await login(socket, data.uuid, data.username));

    user.reconnected(socket);
    onUserConnected(user, socket);
  });

  socket.onMessage(ClientMessageType.LOGIN, async data => {
    user = await login(socket, data.uuid, data.username);
    onUserConnected(user, socket);
  });

  socket.onMessage(ClientMessageType.SET_OBSTACLES, ({ obstacles }) =>
    setObstacles(obstacles),
  );

  socket.send(ServerMessageType.HANDSHAKE);
});

function onUserConnected(user: ServerUser, socket: ServerSocket) {
  socket.onMessage(ClientMessageType.USER_ACTIONS, data =>
    user.setActions(data.actions),
  );

  socket.onMessage(ClientMessageType.LOGOUT, data => logout(user.id));
}
